-- vim: foldmethod=syntax
begin;
    set role ogalerie_admin;

    -- Retourne le propriétaire d'une œuvre
    drop function if exists public.get_artwork_owner;
    create function public.get_artwork_owner (i int) returns int as
    $$
        select person_id
        from artwork
        where id = i ;
    $$ language sql security definer;

    -- Retourne les artworks d'un utilisateur
    drop function if exists public.get_user_artworks;
    create function public.get_user_artworks (p_id int) returns setof artwork as
    $$
        select *
        from artwork
        where person_id = p_id ;
    $$ language sql security definer;

    -- Retire un artwork
    drop function if exists public.delete_artwork;
    create function public.delete_artwork (json) returns int as
    $$
        delete from mark
        where artwork_id = ($1->>'id')::int
        ;
        delete from art_comment
        where artwork_id = ($1->>'id')::int
        ;
        delete from appraise
        where artwork_id = ($1->>'id')::int
        ;
        delete from favorite
        where artwork_id = ($1->>'id')::int
        ;
        delete from public.artwork a
        where a.id = ($1->>'id')::int
        returning 1
        ;
    $$ language sql strict security definer;

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
    ;
    insert into public.mark as m
    (artwork_id, tag_id)
    values
        (
            (select id from artwork where uri = n->>'uri'),
            (select id from tag t where t.category = 'type' and t.name = (n->>'type')::sticker)
        ),
        (
            (select id from artwork where uri = n->>'uri'),
            (select id from tag t where t.category = 'support' and t.name = (n->>'support')::sticker)
        ),
        (
            (select id from artwork where uri = n->>'uri'),
            (select id from tag t where t.category = 'style' and t.name = (n->>'style')::sticker)
        )
    ;
    select * from get_artwork(
        (select id from artwork where uri = n->>'uri'),
        0
    ) ;
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
            -- Nombre de like reçus
            'likes', (select get_appraises_count(a.id)),
            -- liké par le visiteur
            'liked_by', (select count(*) from appraise where artwork_id = a_id and person_id = v_id),
            -- dans la liste de favoris du visiteur
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

    -- Met à jour les informations d'une œuvre
    drop function if exists public.update_artwork;
    create function update_artwork(maj json) returns artwork as
    $$
    declare
        art_db public.artwork;
    begin
        -- On récupère l'artwork en BDD et le stocke dans art_db
        select * into art_db
        from public.artwork where id = (maj->>'id')::int;

        -- On met à jour ce qui doit l'être
        if maj->>'title' is not null
        then
            art_db.title = maj->>'title';
        end if;
        if maj->>'mature' is not null
        then
            art_db.mature = maj->>'mature';
        end if;
        if maj->>'collection_id' is not null
        then
            art_db.collection_id = (maj->>'collection_id')::int;
        end if;
        if maj->>'date' is not null
        then
            art_db.date = (maj->>'date')::date;
        end if;
        if maj->>'description' is not null
        then
            art_db.description = maj->>'description';
        end if;
        if maj->>'uri' is not null
        then
            art_db.uri = maj->>'uri';
        end if;

        art_db.updated_at = now();

        if maj->>'type' is not null
        then
            delete from mark
            where artwork_id = (maj->>'id')::int
            and tag_id = (select id from tag t where t.category = 'type' and t.name = (maj->>'type')::sticker);
            insert into mark
            (artwork_id, tag_id)
            values
            (
                (maj->>'id')::int,
                (select id from tag t where t.category = 'type' and t.name = (maj->>'type')::sticker)
            );
        end if;
        if maj->>'support' is not null
        then
            delete from mark
            where artwork_id = (maj->>'id')::int
            and tag_id = (select id from tag t where t.category = 'support' and t.name = (maj->>'support')::sticker);
            insert into mark
            (artwork_id, tag_id)
            values
            (
                (maj->>'id')::int,
                (select id from tag t where t.category = 'support' and t.name = (maj->>'support')::sticker)
            );
        end if;
        if maj->>'style' is not null
        then
            delete from mark
            where artwork_id = (maj->>'id')::int
            and tag_id = (select id from tag t where t.category = 'style' and t.name = (maj->>'style')::sticker);
            insert into mark
            (artwork_id, tag_id)
            values
            (
                (maj->>'id')::int,
                (select id from tag t where t.category = 'style' and t.name = (maj->>'style')::sticker)
            );
        end if;

        -- Réintroduit les infos dans la BDD
        update public.artwork
        set
            title = art_db.title,
            mature = art_db.mature,
            date = art_db.date,
            description = art_db.description,
            uri = art_db.uri,
            collection_id = art_db.collection_id,
            updated_at = art_db.updated_at
        where id = (maj->>'id')::int;

        -- return les valeurs actualisées.
        return art_db;
    end;
    $$ language plpgsql security definer;

    -- Retourne une sélection aléatoire
    drop function if exists public.random_artworks;
    create function random_artworks () returns setof json as
    $$
    select json_build_object(
        'id', a.id,
        'title', a.title,
        'uri', a.uri,
        'collection_id', a.collection_id,
        'collection', c.title,
        'owner_id', a.person_id,
        'owner', p.nickname
    )
    from artwork a
    join collection c on c.id = a.collection_id
    join person p on p.id = a.person_id
    order by random()
    limit 12;

    $$ language sql security definer;

    -- Retourne tous les artworks
    drop function if exists public.get_artworks;
    create function public.get_artworks () returns setof json as
    $$
        select json_build_object(
            'id', a.id,
            'title', a.title,
            'uri', a.uri,
            'collection_id', a.collection_id,
            'collection', c.title,
            'owner_id', a.person_id,
            'owner', p.nickname
        )
        from artwork a
        join collection c on c.id = a.collection_id
        join person p on p.id = a.person_id
        ;
    $$ language sql security definer;

    drop function if exists public.filter_tag;
    create function public.filter_tag (t int) returns setof int as
    $$
        select a.id
        from artwork a
        join mark on artwork_id = a.id
        join tag on tag_id = tag.id
        where tag.id = t ;
    $$ language sql security definer;

    reset role;
commit;
