-- vim: foldmethod=syntax
begin;
    set role ogalerie_admin;

    -- Retourne les artworks d'un utilisateur
    drop function if exists public.get_user_artworks;
    create function public.get_user_artworks (p_id int) returns setof artwork as
    $$
        select *
        from artwork
        where person_id = p_id ;
    $$ language sql security definer;

    -- Créer un artwork
    drop function if exists public.create_artwork;
    create function create_artwork (n json) returns json as
    $$
    insert into public.artwork as a
    ( title, uri, date, description, mature, collection_id, person_id )
    select
        n->>'title',
        n->>'uri',
        (n->>'date')::date,
        n->>'description',
        (n->>'mature')::boolean,
        (n->>'collection_id')::int,
        (n->>'ownerId')::int
    returning json_build_object(
        'id', a.id,
        'title', a.title,
        'date', a.date,
        'description', a.description,
        'mature', a.mature,
        'uri', a.uri,
        'collection_id', a.collection_id,
        'ownerId', a.person_id,
        'created_at', a.created_at
    );
    $$ language sql security definer;

    -- Retourne un artwork
    drop function if exists public.get_artwork;
    create function public.get_artwork (a_id int, v_id int) returns json as
    $$
        select json_build_object(
            'id', a.id,
            'title', a.title,
            'mature', a.mature,
            'collection_id', a.collection_id,
            'collection', c.title,
            'owner_id', a.person_id,
            'owner', p.nickname,
            'date', a.date,
            'description', a.description,
            'uri', a.uri,
            'created_at', a.created_at,
            'updated_at', a.updated_at,
            'likes', (select count(*) from appraise l where l.artwork_id = a.id),
            'liked_by', (select count(*) from appraise where artwork_id = a_id and person_id = v_id),
            'favorite_by', (select count(*) from favorite where artwork_id = a_id and person_id = v_id)
        )
        from artwork a
        join collection c on c.id = a.collection_id
        join person p on p.id = a.person_id
        where a.id = a_id ;
    $$ language sql security definer;

    -- Retourne les tags associés à une œuvre
    drop function if exists public.get_artwork_tags;
    create function public.get_artwork_tags (i int) returns setof json as
    $$
        select json_build_object(
            'name', t.name,
            'category', t.category
        )
        from mark
        join tag t on t.id = tag_id
        where artwork_id = i ;
    $$ language sql security definer;

    -- Retourne les commentaires associés à une œuvre
    drop function if exists public.get_artwork_comment;
    create function get_artwork_comment (i int) returns setof json as
    $$
        select json_build_object(
            'id', c.id,
            'content', c.content,
            'owner', p.nickname,
            'owner_id', p.id,
            'created_at', c.created_at,
            'updated_at', c.updated_at
        )
        from art_comment c
        join person p on p.id = c.person_id
        where artwork_id = i ;
    $$ language sql security definer;

    reset role;
commit;
