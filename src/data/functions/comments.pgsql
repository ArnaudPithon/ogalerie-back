-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

    -- Retourne les commentaires associés à un utilisateur
    drop function if exists public.get_user_comments;
    create function get_user_comments (i int) returns setof json as
    $$
        select json_build_object(
            'id', c.id::int,
            'content', c.content,
            'created_at', c.created_at,
            'updated_at', c.updated_at
        )
        from art_comment c
        join artwork a on a.id = c.artwork_id::int
        where c.person_id = i
        order by c.created_at desc
        ;
    $$ language sql security definer;

    -- Retourne les commentaires associés à une œuvre
    drop function if exists public.get_artwork_comments;
    create function get_artwork_comments (i int) returns setof json as
    $$
        select json_build_object(
            'id', c.id,
            'content', c.content,
            'owner', p.nickname,
            'owner_id', p.id,
            'avatar', p.avatar,
            'created_at', c.created_at,
            'updated_at', c.updated_at
        )
        from art_comment c
        join person p on p.id = c.person_id
        where artwork_id = i
        order by c.created_at desc
        ;
    $$ language sql security definer;

    -- Retourne un commentaire par son id
    drop function if exists public.get_comment;
    create function get_comment (i int) returns json as
    $$
        select json_build_object(
            'id', c.id,
            'content', c.content,
            'owner', p.nickname,
            'owner_id', p.id,
            'avatar', p.avatar,
            'created_at', c.created_at,
            'updated_at', c.updated_at
        )
        from art_comment c
        join person p on p.id = c.person_id
        where c.id = i ;
    $$ language sql security definer;

    -- Post un commentaire
    drop function if exists public.post_comment;
    create function post_comment (n json) returns json as
    $$
        insert into art_comment as c (
            content, artwork_id, person_id
        )
        select
            n->>'content',
            (n->>'artwork_id')::int,
            (n->>'id')::int
        returning
        (select * from get_comment(c.id))
        ;
    $$ language sql security definer;

    commit;
reset role;
