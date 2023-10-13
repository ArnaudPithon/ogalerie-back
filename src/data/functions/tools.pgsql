-- vim: foldmethod=syntax
set role ogalerie_admin;
begin;

    -- Retourne une liste des œuvres modérées
    drop function if exists public.artworks_to_hide;
    create function public.artworks_to_hide() returns setof int as
    $$
        select artwork_id
        from moderate
        where ticket = 'hide' ;
    $$ language sql security definer;

    -- Retourne une liste des commentaires modérées
    drop function if exists public.comments_to_hide;
    create function public.comments_to_hide() returns setof int as
    $$
        select comment_id
        from moderate
        where ticket = 'hide' ;
    $$ language sql security definer;

    -- Retourne le total de like reçus par une œuvre
    drop function if exists public.get_appraises_count;
    create function get_appraises_count(i int) returns int as
    $$
        select count(*)::int
        from appraise
        where artwork_id = i ;
    $$ language sql security definer;

    -- Retourne le compte des likes donnés par un utilisateur
    drop function if exists public.like_given;
    create function public.like_given(i int) returns int as
    $$
        select count(*)::int from appraise
        where person_id = i ;
    $$ language sql security definer;

    -- Retourne le compte des likes reçus par un artist
    drop function if exists public.like_received;
    create function public.like_received(i int) returns int as
    $$
        select count(*)::int from appraise
        where artwork_id in (
            select id
            from artwork
            where person_id = i
        ) ;
    $$ language sql security definer;

    commit;
reset role;
