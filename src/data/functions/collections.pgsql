-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

    -- Retourne les collections d'un utilisateur
    drop function if exists public.get_user_collections;
    create function public.get_user_collections (p_id int) returns setof json as
    $$
        select json_build_object(
            'id', c.id,
            'title', c.title,
            'created_at', c.created_at,
            'updated_at', c.updated_at
        )
        from collection as c
        where c.person_id = p_id
        ;
    $$ language sql security definer;

    -- Retourne les œuvres liées à une collection
    drop function if exists public.get_collection_artwork;
    create function get_collection_artwork (c_id int) returns setof artwork as
    $$
        select *
        from artwork
        where collection_id = c_id;
    $$ language sql security definer;

    -- Créer une collection
    drop function if exists public.create_collection;
    create function create_collection (n json) returns json as
    $$
    insert into public.collection as c
    ( title, person_id )
    select
        n->>'title',
        (n->>'ownerId')::int
    returning json_build_object(
        'id', c.id,
        'title', c.title,
        'ownerId', c.person_id
    );
    $$ language sql security definer;

    commit;
reset role;
