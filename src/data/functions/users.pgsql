-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

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
            'biography', p.biography,
            'avatar', p.avatar,
            'like', (   -- likes donnés
                select count(*) from appraise
                where person_id = id
            ),
            'liked', (  -- likes reçus
                select count(*) from appraise
                where artwork_id in (
                    select id from artwork where person_id = p.id
                )
            ),
            'situation', p.situation
        )
        from public.person p
        where p.id = u_id;
    $$ language sql strict security definer;

    -- Retourne le profil public d'un visiteur identifié par son id
    drop function if exists public.get_user_profil;
    create function public.get_user_profil (u_id int) returns json as
    $$
        select json_build_object(
            'id', p.id,
            'nickname', p.nickname,
            'town', p.town,
            'country', p.country,
            'biography', p.biography,
            'avatar', p.avatar,
            'like', (   -- likes donnés
                select count(*) from appraise
                where person_id = id
            ),
            'liked', (  -- likes reçus
                select count(*) from appraise
                where artwork_id in (
                    select id from artwork where person_id = p.id
                )
            )
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
        biography,
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
        new_user->>'biography',
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
        if p->>'biography' is not null
        then
            person_db.biography = p->>'biography';
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
            biography = person_db.biography,
            avatar = person_db.avatar,
            updated_at = person_db.updated_at
        where id = (p->>'id')::int;

        -- Retourne les valeurs actualisées.
        return person_db;
        -- TODO : Je préfèrerai ne pas renvoyer le hash
    end;
    $$ language plpgsql security definer;

    -- Retourne la liste de favoris d'un utilisateur
    drop function if exists public.get_user_favorites;
    create function get_user_favorites(i int) returns setof json as
    $$
        select json_build_object(
            'id', a.id,
            'title', a.title,
            'mature', a.mature,
            'collection', a.collection_id,
            'owner', p.nickname,
            'owner_id', p.id,
            'date', a.date,
            'description', a.description,
            'uri', a.uri,
            'created_at', a.created_at,
            'updated_at', a.updated_at
        )
        from person p
        join favorite f on person_id = p.id
        join artwork a on artwork_id = a.id
        where p.id = i ;
    $$ language sql security definer;

    commit;
reset role;
