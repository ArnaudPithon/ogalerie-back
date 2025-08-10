-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

    -- Retourne les œuvres ayant un tag définit
    drop function if exists public.get_tag;
    create function public.get_tag (i int) returns setof json as
    $$
    select json_build_object(
        'id', a.id,
        'title', a.title,
        'uri', a.uri,
        'date', a.date,
        'description', a.description,
        'mature', a.mature,
        'collection_id', collection_id,
        'owner_id', person_id,
        'created_at', created_at,
        'updated_at', updated_at
    )
    from tag t
    join mark on t.id = tag_id
    join artwork a on a.id = artwork_id
    where t.id = i ;
    $$ language sql security definer;

    -- Retourne une liste des tags
    drop function if exists public.get_tags;
    create function public.get_tags () returns setof tag as
    $$
        select *
        from tag;
    $$ language sql security definer;

    commit;
reset role;
