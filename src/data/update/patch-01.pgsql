-- vim: foldmethod=syntax
begin;
    set role ogalerie_admin;

    alter type sticker add value if not exists 'numérique';
    alter table tag add unique(name, category);

    insert into tag (name, category)
    values
    ('aquarelle', 'type'),
    ('sculpture', 'type'),
    ('numérique', 'support')
    ;

    reset role;
commit;
