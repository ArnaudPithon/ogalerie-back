-- vim: foldmethod=syntax:foldlevel=1
begin;
    set role ogalerie_admin;

    SELECT pg_catalog.setval('public.art_comment_id_seq', 128, true);
    SELECT pg_catalog.setval('public.artwork_id_seq', 88, true);
    SELECT pg_catalog.setval('public.collection_id_seq', 27, true);
    SELECT pg_catalog.setval('public.favorite_id_seq', 21, true);
    SELECT pg_catalog.setval('public.person_id_seq', 17, true);
    SELECT pg_catalog.setval('public.tag_id_seq', 18, true);

    reset role;
commit;
