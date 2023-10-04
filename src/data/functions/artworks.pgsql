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

    reset role;
commit;

