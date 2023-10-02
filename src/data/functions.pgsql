-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

    -- Retourne les infos d'un visiteur identifié par son email
    drop function if exists public.get_user_by_email;
    create function public.get_user_by_email (json) returns json as
    $$
        select json_build_object(
            'id', p.id,
            'firstname', p.firstname,
            'lastname', p.lastname,
            'nickname', p.nickname,
            'email', p.email,
            'birthday', p.birthday,
            'town', p.town,
            'country', p.country,
            'avatar', p.avatar,
            'situation', p.situation
        )
        from public.person p
        where p.email = $1->>'email';
    $$ language sql strict security definer;

    -- Retourne les infos d'un visiteur identifié par son id
    drop function if exists public.get_user_by_id;
    create function public.get_user_by_id (u_id int) returns json as
    $$
        select json_build_object(
            'id', p.id,
            'firstname', p.firstname,
            'lastname', p.lastname,
            'nickname', p.nickname,
            'email', p.email,
            'birthday', p.birthday,
            'town', p.town,
            'country', p.country,
            'avatar', p.avatar,
            'situation', p.situation
        )
        from public.person p
        where p.id = u_id;
    $$ language sql strict security definer;

    -- Connexion
    drop function if exists public.sign_in;
    create function public.sign_in (json) returns json as
    $$
        select json_build_object(
            'id', p.id,
            'nickname', p.nickname,
            'hash', p.hash,
            'situation', p.situation
        )
        from public.person p
        where p.email = $1->>'email';
    $$ language sql strict security definer;

    -- Retire un utilisateur
    drop function if exists public.delete_person;
    create function public.delete_person (json) returns json as
    $$
        delete from public.person p
        where p.id = ($1->>'id')::int
        returning $1
        ;
    $$ language sql strict security definer;

    -- Enregistre un nouvel utilisateur
    drop function if exists public.insert_user;
    create function public.insert_user (new_user json) returns json as
    $$
    insert into public.person as p
    (
        firstname,
        lastname,
        nickname,
        email,
        hash,
        birthday,
        town,
        country,
        avatar,
        situation
    )
    select
        new_user->>'firstname',
        new_user->>'lastname',
        new_user->>'nickname',
        new_user->>'email',
        new_user->>'hash',
        (new_user->>'birthday')::date,
        new_user->>'town',
        new_user->>'country',
        new_user->>'avatar',
        (new_user->>'situation')::situation
    returning json_build_object(
        'id', p.id,
        'nickname', p.nickname,
        'situation', p.situation
    );
    $$ language sql security definer;

    -- Fournit la liste des utilisateurs en fonction de leur situation
    drop function if exists public.get_users;
    create function get_users(s situation) returns setof json as
    $$
        select json_build_object(
            'id', p.id,
            'firstname', p.firstname,
            'lastname', p.lastname,
            'nickname', p.nickname
        )
        from public.person p
        where p.situation = s ;
    $$ language sql security definer;

    -- Met à jour les infos d'un utilisateur
    drop function if exists public.update_person;
    create function update_person(p json) returns public.person as
    $$
    declare
        person_db public.person;
    begin
        -- On récupère l'utilisateur en BDD et le stocke dans person_db
        select * into person_db
        from public.person where id = (p->>'id')::int;

        -- On met à jour ce qui doit l'être
        if p->>'firstname' is not null
        then
            person_db.firstname = p->>'firstname';
        end if;
        if p->>'lastname' is not null
        then
            person_db.lastname = p->>'lastname';
        end if;
        if p->>'nickname' is not null
        then
            person_db.nickname = p->>'nickname';
        end if;
        if p->>'birthday' is not null
        then
            person_db.birthday = (p->>'birthday')::date;
        end if;
        if p->>'town' is not null
        then
            person_db.town = p->>'town';
        end if;
        if p->>'country' is not null
        then
            person_db.country = p->>'country';
        end if;
        if p->>'avatar' is not null
        then
            person_db.avatar = p->>'avatar';
        end if;

        person_db.updated_at = now();

        -- Réintroduit les infos de person_db dans la BDD
        update public.person
        set
            firstname = person_db.firstname,
            lastname = person_db.lastname,
            nickname = person_db.nickname,
            birthday = person_db.birthday,
            town = person_db.town,
            country = person_db.country,
            avatar = person_db.avatar,
            updated_at = person_db.updated_at
        where id = (p->>'id')::int;

        -- Retourne les valeurs actualisées.
        return person_db;
        -- TODO : Je préfèrerai ne pas renvoyer le hash
    end;
    $$ language plpgsql security definer;

    -- Retourne les collections d'un utilisateur
    drop function if exists public.get_user_collections;
    create function public.get_user_collections (p_id int) returns setof json as
    $$
        select json_build_object(
            'id', c.id,
            'title', c.title,
            'artwork', a.*
        )
        from collection as c
        join artwork as a
        on collection_id = c.id
        where c.person_id = p_id
        ;
    $$ language sql security definer;

    -- Retourne les artworks d'un utilisateur
    drop function if exists public.get_user_artworks;
    create function public.get_user_artworks (p_id int) returns setof artwork as
    $$
        select *
        from artwork
        where person_id = p_id ;
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
