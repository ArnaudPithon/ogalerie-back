-- vim: foldmethod=syntax
begin;
    set role ogalerie_admin;

    insert into tag (name, category)
    values
    ('peinture', 'type'),
    ('dessin', 'type'),
    ('photographie', 'type'),
    ('toile', 'support'),
    ('papier', 'support'),
    ('bois', 'support'),
    ('portrait', 'style'),
    ('figuratif', 'style'),
    ('paysage', 'style'),
    ('abstrait', 'style'),
    ('autre', 'type'),
    ('autre', 'support'),
    ('autre', 'style')
    ;

    insert into person (
        firstname, lastname, nickname, email,
        hash,
        birthday, town, country, avatar, situation
    )
    values
    (
        null, null, 'unix', 'unix@bell.com',
        '$2b$10$DVVeanj0y8T8gPjrkxtf.u5MjgV94W5TmlqBIgZxOLRVeOruvRI3q', -- password1
        '1970-01-01', 'MIT', 'Massachusetts',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UNIX_logo.svg/250px-UNIX_logo.svg.png',
        'admin'
    ),
    (
        'Giselle', 'Knowles-Carter', 'Beyonce', 'beyonce@destiny.com',
        '$2b$10$CdID6r3CoEmKqJ4YQkpn7.rpeTI5EcFcvJOGyx7NGGO8V34up6HL2', -- password2
        '1981-09-04', 'Houston', 'Texas',
        'https://i.pinimg.com/originals/bd/56/8e/bd568e9fc16a2e5a37b7abcb7a183dee.jpg',
        'creator'
    ),
    (
        'Philip', 'J. Fry', 'Fry', 'fry@futurama.com',
        '$2b$10$J0kyBTEc0R2ABpgYQkUPUuh5QtpfIysCOh9hnM2RuOCZzY/1xrY2y', -- password3
        '1999-01-01', 'New York', 'U.S.A.',
        'https://upload.wikimedia.org/wikipedia/en/2/28/Philip_Fry.png',
        'user'
    )
    ;

    insert into collection (
        title, person_id
    )
    values
    (
        'Lemonade', (select id from person where nickname = 'Beyonce')
    )
    ;

    insert into artwork (title, uri, date, description, collection_id, person_id)
    values
    (
        'cover', 'https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png',
        '2016-04-23', 'photo de l''album Lemonade',
        (select id from collection where title = 'Lemonade'),
        (select id from person where nickname = 'Beyonce')
    ),
    (
        'artist', 'http://cos.h-cdn.co/assets/16/16/1600x800/landscape-1461465330-beyonce-lemonade.jpg',
        '2016-04-01', 'probablement lors du tournage d''un clip',
        (select id from collection where title = 'Lemonade'),
        (select id from person where nickname = 'Beyonce')
    )
    ;

    insert into mark (tag_id, artwork_id)
    values
    (
        (select id from tag where name = 'photographie'),
        (select id from artwork where title = 'cover')
    ),
    (
        (select id from tag where name = 'photographie'),
        (select id from artwork where title = 'artist')
    ),
    (
        (select id from tag where name = 'portrait'),
        (select id from artwork where title = 'artist')
    )
    ;

    insert into art_comment (
        content, artwork_id, person_id
    )
    values
    (
        'Beyonce t''es trop mon idole.',
        (select id from artwork where title = 'artist'),
        (select id from person where nickname = 'Fry')
    ),
    (
        'Super album, vivement le concert.',
        (select id from artwork where title = 'cover'),
        (select id from person where nickname = 'Fry')
    )
    ;

    insert into appraise (
        artwork_id, person_id
    )
    values
    (
        (select id from artwork where title = 'artist'),
        (select id from person where nickname = 'Fry')
    ),
    (
        (select id from artwork where title = 'cover'),
        (select id from person where nickname = 'Fry')
    )
    ;

    insert into favorite (
        person_id, artwork_id
    )
    values
    (
        (select id from person where nickname = 'Fry'),
        (select id from artwork where title = 'artist')
    )
    ;

    reset role;
commit;
