-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

    drop function if exists public.get_user_by_email;
    drop function if exists public.insert_user;
    drop function if exists public.sign_in;

    -- Retourne les infos d'un visiteur identifié par son email
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

    -- Enregistre un nouvel utilisateur
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
        'nickname', p.nickname,
        'situation', p.situation
    );
    $$ language sql security definer;

    -- Fournit la liste des utilisateurs creator
    drop function if exists get_creators;

    create function get_creators() returns setof json as
    $$
        select json_build_object(
            'id', p.id,
            'firstname', p.firstname,
            'lastname', p.lastname,
            'nickname', p.nickname
        )
        from public.person p
        where p.situation = 'creator';
    $$ language sql security definer;

    commit;
reset role;
