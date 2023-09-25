set role ogalerie_admin;
begin;

    -- Retourne les infos d'un visiteur identifié par son email
    drop function if exists get_user_by_email;
    create function get_user_by_email (e text) returns person as
    $$
        select * from person where email = e;
    $$ language sql strict security definer;

    -- Enregistre un nouvel utilisateur
    drop function if exists insert_user;
    create function insert_user (f text, l text, n text, e text, h text, b date, t text, c text, a text, s situation) returns person as
    $$
    insert into person(firstname, lastname, nickname, email, hash, birthday, town, country, avatar, situation)
    values
    (
        f, l, n, e, h, b, t, c, a, s
    )
    returning *;
    $$ language sql strict security definer;

    commit;
    reset role;
