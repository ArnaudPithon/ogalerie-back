--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

begin;
    set role ogalerie_admin;

--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.tag (id, name, category) FROM stdin;
1	peinture	type
2	dessin	type
3	photographie	type
4	toile	support
5	papier	support
6	bois	support
7	portrait	style
8	figuratif	style
9	paysage	style
10	abstrait	style
11	autre	type
12	autre	support
13	autre	style
14	aquarelle	type
15	sculpture	type
17	numérique	support
18	textile	support
\.

--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.person (id, firstname, lastname, nickname, email, hash, birthday, town, country, biography, avatar, situation, created_at, updated_at) FROM stdin;
2	Giselle	Knowles-Carter	Beyonce	beyonce@destiny.com	$2b$10$CdID6r3CoEmKqJ4YQkpn7.rpeTI5EcFcvJOGyx7NGGO8V34up6HL2	1981-09-04	Houston	Texas	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.	https://i.pinimg.com/originals/bd/56/8e/bd568e9fc16a2e5a37b7abcb7a183dee.jpg	creator	2023-10-06 16:38:19.554751+02	2023-10-06 17:36:51.082741+02
3	Philip	J. Fry	Fry	fry@futurama.com	$2b$10$J0kyBTEc0R2ABpgYQkUPUuh5QtpfIysCOh9hnM2RuOCZzY/1xrY2y	1999-01-01	New York	U.S.A.	Coucou	https://upload.wikimedia.org/wikipedia/en/2/28/Philip_Fry.png	user	2023-10-06 16:38:19.554751+02	2023-10-10 10:57:46.549277+02
1	Linus	Torvalds	unix	unix@bell.com	$2b$10$DVVeanj0y8T8gPjrkxtf.u5MjgV94W5TmlqBIgZxOLRVeOruvRI3q	1970-01-01	MIT	Massachusetts	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.	https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UNIX_logo.svg/250px-UNIX_logo.svg.png	admin	2023-10-06 16:38:19.554751+02	2023-10-11 09:24:58.426669+02
17	Jean	Bertrand	Pierrot	pierrot@mail.com	$2b$10$S0uMvXKSo6UM4CFYLhXvWukkxxJeCiPHYF/C9sBkhscPMtXYtNiX2	1993-03-18	Lyon	France	\N	https://res.cloudinary.com/do9r39alv/image/upload/v1697532749/o2l3d9uo4xrry8n4jddg.png	user	2023-10-17 10:53:14.582095+02	2023-10-17 10:53:39.887949+02
5	Antoine	Dupont	Anto	anto@mail.com	$2b$10$Bg5kvgwyc9qd3QuLiR0l2.lII6vbH/hK/ozqzSJU56s6C7iVUGh.K	1996-02-01	Bordeaux	France	Hello ! Je m'appelle Antoine, je suis étudiant aux Beaux-Arts de Bordeaux. J'aimerais devenir artiste un jour... Bienvenue sur mon profil !	https://res.cloudinary.com/do9r39alv/image/upload/v1696879855/yqj3zweh8pl5hnraqufi.png	creator	2023-10-09 21:32:09.77777+02	2023-10-09 21:37:04.16579+02
7	Samantha	Grenier	Samartist	samartist@mail.com	$2b$10$94doS1Fsq422DxvTSS1aMefwThVV0rLKxXOZWOAuSqVokURtP/doO	1985-08-05	Montpellier	France	Peintre professionnelle française, de style contemporain, je suis installée depuis 10 ans dans la région de Montpellier. Bonne visite.	https://res.cloudinary.com/do9r39alv/image/upload/v1696883857/fg5yrccl45rtanjmmyve.png	creator	2023-10-09 22:41:57.274335+02	2023-10-09 22:44:59.099968+02
8	Lisa	Norbert	Lili	lili@mail.com	$2b$10$fTmE3klVXdqw3N6TJLL8nemtdTrpfS/iTpxl1Rnjs55Ass804uiAK	1995-12-17	Rennes	France	Hello ! Je suis photographe et je veux partager avec vous mes photos. N'hésitez pas à laisser des commentaires !	https://res.cloudinary.com/do9r39alv/image/upload/v1696884879/gd3vkjedrriiiixmo0e5.png	creator	2023-10-09 22:55:56.438483+02	2023-10-09 22:57:22.935399+02
11	Luffy	Monkey	Luffy	Monkey-D.Luffy@gmail.com	$2b$10$N2MSXrLQJl9ZCE78V2BEMe1thV/C3yipjnb.Dypv1qmvZpcU.Hq7m	1999-06-05	Sunny	Wano	Le roi des pirates	https://res.cloudinary.com/do9r39alv/image/upload/v1697013574/npu9wvqvdy4goscfrb1n.jpg	creator	2023-10-11 10:02:31.496866+02	2023-10-12 11:54:07.022063+02
14	Sostell	Toda	Sostyle	sostellencheres@live.fr	$2b$10$Obx54K2YLJycDYxMp8o7Uu7qqQSuLTSIdm2LBmpryCEppvQ9AfDNW	1982-02-15	Lyon	France	\N	https://res.cloudinary.com/do9r39alv/image/upload/v1697097553/wltl4gcn4obuookaxqmj.jpg	creator	2023-10-12 09:59:24.091805+02	\N
13	Nicolas	Mouret	Nico	mouret.nicolas63@gmail.com	$2b$10$tiZ0ahBJVftBL0JtPhBPpeTGVU2OQ6DKHyhwBbz6s9rVO7fCnMuj6	1990-01-12	Clermont-ferrand	France	Je suis là pour les tuxs	https://res.cloudinary.com/do9r39alv/image/upload/v1697125761/gjm3uqyvyhcwr26kyqlc.jpg	user	2023-10-12 09:51:33.621053+02	2023-10-13 10:06:55.77974+02
15	Aliénor	Berthinier	Alié	alienor@mail.com	$2b$10$SDiAr7yh1Rx4EGAjyWKbxe4ZzfYZ18wUQ/WHpn1iAtfQVmFlH3UPy	1993-03-18	Lyon	France	Hello, j'aime l'art et je dessine moi-même à mes heures perdues...	https://res.cloudinary.com/do9r39alv/image/upload/v1697184266/cvwo2pagku7qagxvd1pj.png	creator	2023-10-13 10:04:39.558765+02	2023-10-13 10:08:41.019301+02
6	Sam	Robson	Samy	samy@mail.com	$2b$10$mc88hEhXy3A.ZmPR/QwEEeQy8lO2GCR5E7xr83Q4aaCoCtGUQLpsG	1989-04-21	Chigago	USA	Hi guys! Welcome to my profile. I hope you'll enjoy my paintings! Don't hesitate to contact me via the form if you'd like to buy my work.	https://res.cloudinary.com/do9r39alv/image/upload/v1696883097/mjs9qa8lqpprlldppwgl.png	creator	2023-10-09 22:25:43.171007+02	2023-10-16 05:17:30.563976+02
4	Clémence	Robert	Clem	clem@mail.com	$2b$10$/Cr7gg0Yp/EgYWvPaf64FuBUDqXz/ACeftwZ0NibEdzM4ZoOvLqCm	1995-11-11	Lyon	France	Photographie des portraits des paysages et innonde O'Galerie de Tuxs.	https://res.cloudinary.com/do9r39alv/image/upload/v1696867935/accjgcsllfndr3zm9e5c.png	creator	2023-10-08 16:03:02.815565+02	2023-10-13 10:00:27.287582+02
\.

--
-- Data for Name: collection; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.collection (id, title, person_id, created_at, updated_at) FROM stdin;
1	Lemonade	2	2023-10-06 16:38:19.554751+02	\N
2	unix collection	1	2023-10-07 14:12:34.972526+02	\N
7	Peintures	5	2023-10-09 21:39:10.245502+02	\N
8	Abstract paintings	6	2023-10-09 22:30:59.160953+02	\N
9	Dessins	7	2023-10-09 22:50:17.776892+02	\N
10	Photoshoot à la plage	8	2023-10-09 23:01:07.658088+02	\N
12	Sculptures	5	2023-10-10 09:36:08.798709+02	\N
13	gjh	11	2023-10-11 10:32:30.544594+02	\N
20	Portrait	14	2023-10-12 16:25:44.460411+02	\N
25	Inspiration japonaise	15	2023-10-13 10:05:30.147349+02	\N
26	Collection Cities	15	2023-10-13 11:02:02.916199+02	\N
27	Collection Abstract	15	2023-10-13 14:00:42.015979+02	\N
4	Portraits	4	2023-10-08 16:11:50.181658+02	2023-10-16 10:32:53.509934+02
22	Les manchots  d'O'galerie	4	2023-10-12 16:35:15.438045+02	2023-10-16 15:20:58.574698+02
5	Paysages	4	2023-10-09 16:27:36.373566+02	2023-10-16 15:23:21.680915+02
\.

--
-- Data for Name: artwork; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.artwork (id, title, uri, date, description, mature, collection_id, person_id, created_at, updated_at) FROM stdin;
1	cover	https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png	2016-04-23	photo de l'album Lemonade	\N	1	2	2023-10-06 16:38:19.554751+02	\N
2	artist	http://cos.h-cdn.co/assets/16/16/1600x800/landscape-1461465330-beyonce-lemonade.jpg	2016-04-01	probablement lors du tournage d'un clip	\N	1	2	2023-10-06 16:38:19.554751+02	\N
15	Paysage 1	https://res.cloudinary.com/do9r39alv/image/upload/v1696869444/wak3gpaii9vxtpp2uyyh.png	2018-03-15	Description du paysage 1	\N	5	4	2023-10-09 18:37:44.561441+02	\N
14	Portraits 3	https://res.cloudinary.com/do9r39alv/image/upload/v1696866685/wirevcaocwsvg0pwmebh.png	2020-04-12	Portrait de femme dansant	\N	4	4	2023-10-09 17:51:31.376343+02	2023-10-09 23:39:16.269019+02
27	Ocean of colors	https://res.cloudinary.com/do9r39alv/image/upload/v1696921364/ytv6tdec6llg9awurnl9.png	2021-12-24	Abstract painting to represent sunset over ocean	\N	8	6	2023-10-10 09:05:52.730486+02	2023-10-10 09:06:48.011278+02
28	Visages de femmes	https://res.cloudinary.com/do9r39alv/image/upload/v1696921769/v6c0zdjnuocqihmznv1j.png	2022-07-31	Peinture à la gouache issue de mon portfolio.	\N	7	5	2023-10-10 09:10:32.529088+02	\N
29	Anonymous Skywalker	https://res.cloudinary.com/do9r39alv/image/upload/v1696922037/affuj4wuc2isbzbhztcd.png	2021-12-08	Peinture à la gouache réalisée pour mes cours aux Beaux-Arts	\N	7	5	2023-10-10 09:14:05.700856+02	\N
30	Fée mystique	https://res.cloudinary.com/do9r39alv/image/upload/v1696922142/pkdqoswkiej04uoucah6.png	2018-06-21	Aquarelle sur papier représentant une elfe issu d'un univers Heroic fantasy	\N	7	5	2023-10-10 09:16:54.162575+02	\N
33	Colors of the universe	https://res.cloudinary.com/do9r39alv/image/upload/v1696922385/qnxcd6ri4shydc2pylsd.png	2018-04-12	Abstract painting inspired by India	\N	8	6	2023-10-10 09:21:09.433343+02	2023-10-10 09:21:46.751286+02
38	Denver	https://res.cloudinary.com/do9r39alv/image/upload/v1696923495/sl84lyx10e7yhidua5z9.png	2023-05-31	Sculpture d'un dino en céramique	\N	12	5	2023-10-10 09:38:18.455585+02	\N
39	Photoshoot plage 1	https://res.cloudinary.com/do9r39alv/image/upload/v1696923824/thpx2p1cpaozcipsb2sj.png	2023-01-28	Photographie issue d'un photoshoot réalisée dans le cadre d'une campagne publicitaire.	\N	10	8	2023-10-10 09:43:50.720343+02	\N
40	Photoshoot plage 2	https://res.cloudinary.com/do9r39alv/image/upload/v1696923858/xj8ghbiidzfxe1xeuzli.png	2022-07-31	Photographie issue d'un photoshoot réalisée dans le cadre d'une campagne publicitaire.	\N	10	8	2023-10-10 09:44:48.643824+02	\N
41	Photoshoot 3	https://res.cloudinary.com/do9r39alv/image/upload/v1696923919/qcls2tqalujpvbjm6grm.png	2021-01-17	Photographie issue d'un photoshoot réalisée dans le cadre d'une campagne publicitaire.	\N	10	8	2023-10-10 09:46:54.128431+02	\N
42	Visage de femme	https://res.cloudinary.com/do9r39alv/image/upload/v1696924118/fy0lwmf48l4y250u8qe7.png	2021-09-20	Dessin au fusain représentant un visage féminin.	\N	9	7	2023-10-10 09:49:08.581358+02	\N
44	Fleurs de cerisier	https://res.cloudinary.com/do9r39alv/image/upload/v1696924177/xrmrtctkm8w1puoep9tj.png	2020-03-17	Dessin réalisé dans un style japonais, sur feuille de papyrus.	\N	9	7	2023-10-10 09:51:09.459317+02	\N
45	Estampe japonaise	https://res.cloudinary.com/do9r39alv/image/upload/v1696924302/bbiw0ucavynabrwpcrgj.png	2021-05-12	Estampe réalisée dans un style japonais	\N	9	7	2023-10-10 09:52:28.289294+02	\N
8	Visage	https://res.cloudinary.com/do9r39alv/image/upload/v1696843980/hamlxxa9qtpn39jysrjn.png	2020-05-12	description portrait 2	\N	4	4	2023-10-09 11:33:07.741504+02	2023-10-10 11:01:00.628207+02
25	Paysage 2	https://res.cloudinary.com/do9r39alv/image/upload/v1696921447/m3s2pjcog1g3yfzkdt0r.png	2020-02-21	Sunset à Cape Town, Afrique du Sud	\N	5	4	2023-10-10 09:04:10.914475+02	2023-10-10 13:46:09.797571+02
35	Frida	https://res.cloudinary.com/do9r39alv/image/upload/v1696922574/d8fn69ahkgntzk4nktgj.png	2022-02-01	Contemporary painting of Frida Khalo over abstract background	\N	8	6	2023-10-10 09:23:57.375394+02	2023-10-12 14:49:32.752214+02
71	Abstraction soleil levant	https://res.cloudinary.com/do9r39alv/image/upload/v1697198457/jqwmhkv4ditfkpllwszg.webp	2022-07-31	Huile sur toile 	\N	27	15	2023-10-13 14:02:13.42577+02	\N
73	Sunset	https://res.cloudinary.com/do9r39alv/image/upload/v1697198544/jhxfhwvowszi6mahvh7w.webp	2012-03-01	Huile sur toile représentant le soleil couchant derrière une montagne.	\N	27	15	2023-10-13 14:03:26.585793+02	\N
59	Tux Vador	https://res.cloudinary.com/do9r39alv/image/upload/v1697121640/xpnztcg2253u9juwewge.jpg	2023-10-12	It's a trap ! Nous n'utilisons pas de cookies.	\N	22	4	2023-10-12 16:40:46.499777+02	2023-10-12 17:06:06.893367+02
60	TuxVinci	https://res.cloudinary.com/do9r39alv/image/upload/v1697127309/fe0hreg7zwncemxkc0xt.svg	1452-04-14	Un genre d'autoportrait, une mise en abîme de l'artiste.	\N	22	4	2023-10-12 18:15:13.651748+02	\N
58	Manchot martyr	https://res.cloudinary.com/do9r39alv/image/upload/v1697121377/k0aqpbk0to4iehjfvdzu.webp	2023-10-12	Le premier d'une longue lignée	\N	22	4	2023-10-12 16:36:19.862061+02	2023-10-13 09:59:09.560994+02
64	Vague	https://res.cloudinary.com/do9r39alv/image/upload/v1697184425/gpxjbt9ibgzyfpqbv1yt.webp	2023-10-13	Reproduction au posca du tableau d'Hokusaï	\N	25	15	2023-10-13 10:07:27.511599+02	\N
69	baron numerique	https://res.cloudinary.com/do9r39alv/image/upload/v1697186428/kbflqi1ubrmlbcwxa7dk.jpg	2021-02-01	une photo	\N	20	14	2023-10-13 10:40:32.222801+02	\N
70	Exposition universelle 	https://res.cloudinary.com/do9r39alv/image/upload/v1697187752/dpfxlvzqeo6umkdfsvat.jpg	2021-12-24	Dessin sur papier inspiré d'une gravure illustrant Paris lors de l'Exposition universelle de 1900.	\N	26	15	2023-10-13 11:04:01.243587+02	\N
86	Desert de roches	https://res.cloudinary.com/do9r39alv/image/upload/v1697463033/ok3mnbhnn7qkrskiev6j.png	2022-04-01	Peinture grand format sur bois	\N	27	15	2023-10-16 15:33:36.917306+02	\N
87	Hérons au petit matin	https://res.cloudinary.com/do9r39alv/image/upload/v1697463350/fxz6vrmp4drwueqtd2mj.png	2021-11-11	Aquarelle sur papier réalisée dans un style japonisant	\N	25	15	2023-10-16 15:37:11.853485+02	\N
88	Erables	https://res.cloudinary.com/do9r39alv/image/upload/v1697463516/e1exe73q745lwvwfrdgx.png	2021-06-21	Aquarelle représentant des érables du japon à l'automne.	\N	25	15	2023-10-16 15:39:10.742144+02	\N
5	Pierre	https://res.cloudinary.com/do9r39alv/image/upload/v1696837198/jhznvxcqjdlofvdbrgbw.png	2020-06-12	Description modifiée	\N	4	4	2023-10-09 09:41:41.885648+02	2023-10-17 10:56:25.174303+02
\.

--
-- Data for Name: mark; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.mark (tag_id, artwork_id) FROM stdin;
3	1
3	2
7	2
3	14
5	14
7	14
3	15
5	15
9	15
3	25
5	25
9	25
1	27
4	27
10	27
1	28
5	28
8	28
1	29
5	29
8	29
5	30
8	30
1	33
6	33
10	33
1	35
4	35
8	35
12	38
8	38
3	39
12	39
7	39
3	40
12	40
8	40
3	41
12	41
7	41
2	42
5	42
7	42
2	44
5	44
13	44
2	45
5	45
8	45
2	58
6	58
10	58
11	59
17	59
7	59
1	60
4	60
7	60
2	64
5	64
9	64
2	69
5	69
8	69
2	70
5	70
9	70
1	71
4	71
10	71
1	73
4	73
10	73
1	86
6	86
10	86
14	87
5	87
9	87
14	88
5	88
9	88
\.

--
-- Data for Name: art_comment; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.art_comment (id, content, artwork_id, person_id, created_at, updated_at) FROM stdin;
1	Beyonce t'es trop mon idole.	2	3	2023-10-06 16:38:19.554751+02	\N
2	Super album, vivement le concert.	1	3	2023-10-06 16:38:19.554751+02	\N
13	Autre commentaire pertinent	1	1	2023-10-10 20:17:29.11562+02	\N
14	Autre commentaire pertinent	1	1	2023-10-10 20:22:10.92158+02	\N
17	Génial !	1	4	2023-10-11 10:02:11.193883+02	\N
18	Beau travail Anto ! 	29	4	2023-10-11 10:04:45.832773+02	\N
19	Dinosaure Grrr	38	11	2023-10-11 10:08:06.736793+02	\N
22	Commentaire test avatar	40	13	2023-10-12 09:51:52.037264+02	\N
24	🍒	44	11	2023-10-12 10:04:43.862865+02	\N
26	😍	44	4	2023-10-12 10:06:11.249684+02	\N
27	cet emoticone est ..... 🍆	44	14	2023-10-12 10:06:36.520558+02	\N
29	cela me rappelle mon dernier voyage	45	14	2023-10-12 10:11:43.886647+02	\N
106	Trop chou 🥰	38	4	2023-10-12 14:41:25.746086+02	\N
109	I love it!	29	2	2023-10-12 14:57:50.174806+02	\N
110	Tu voyages dans le temps Sostyle ? 🧐	45	4	2023-10-12 18:19:25.107372+02	\N
111	Incroyable ! 🤯	60	13	2023-10-12 18:28:57.054708+02	\N
112	O'Top cette couverture	1	14	2023-10-13 09:58:16.94894+02	\N
113	c'est quoi la différence entre un manchot et un pingouin	58	14	2023-10-13 09:59:03.350495+02	\N
114	Original !	35	15	2023-10-13 11:20:50.466912+02	\N
115	J'adore 😍	45	15	2023-10-13 11:21:15.017587+02	\N
116	🤩	42	15	2023-10-13 11:28:07.50507+02	\N
117	Très original cette peinture 🤔	28	8	2023-10-13 14:29:46.334006+02	\N
118	🌅	25	8	2023-10-13 14:31:14.937985+02	\N
119	Très mystique ! 🧙‍♀️🔮🧚‍♀️	30	8	2023-10-13 14:54:22.635383+02	\N
120	Plutôt 🦖 ou 🦕 ? 	38	8	2023-10-13 14:55:41.797403+02	\N
125	Super beau !	30	15	2023-10-15 00:38:50.616165+02	\N
126	Trop bien fait ! 	64	3	2023-10-16 05:21:14.876945+02	\N
128	Waou	2	17	2023-10-17 10:54:06.661726+02	\N
\.

--
-- Data for Name: appraise; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.appraise (artwork_id, person_id) FROM stdin;
1	3
2	3
1	5
2	5
8	5
14	5
15	5
14	2
1	7
1	8
8	8
8	3
15	3
27	4
35	6
28	6
33	2
8	7
42	3
25	4
42	7
15	4
29	1
29	4
38	11
2	11
38	4
33	4
1	4
8	2
5	11
45	4
44	11
44	4
35	11
45	11
8	4
35	4
60	4
59	13
60	13
58	13
45	15
71	8
28	8
29	8
25	8
30	8
69	13
64	13
44	13
42	4
29	15
39	15
42	8
64	3
70	3
70	4
58	4
71	4
30	4
88	4
59	4
2	17
71	13
\.

--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: ogalerie_admin
--

COPY public.favorite (id, person_id, artwork_id, created_at) FROM stdin;
5	3	2	2023-10-09 15:55:22.138979+02
7	3	15	2023-10-09 23:10:26.102325+02
8	3	8	2023-10-09 23:11:04.428327+02
10	1	29	2023-10-10 19:38:28.087306+02
13	13	59	2023-10-12 18:26:29.874705+02
14	13	60	2023-10-12 18:27:00.150198+02
15	13	58	2023-10-12 18:27:11.150922+02
16	13	69	2023-10-14 04:17:53.401247+02
17	13	64	2023-10-14 04:18:24.702453+02
20	3	64	2023-10-16 05:20:27.090878+02
21	13	44	2023-10-16 15:27:34.775381+02
\.

-- Initialise les séquences ID aux bonnes valeurs pour éviter les conflits

SELECT pg_catalog.setval('public.art_comment_id_seq', 128, true);
SELECT pg_catalog.setval('public.artwork_id_seq', 88, true);
SELECT pg_catalog.setval('public.collection_id_seq', 27, true);
SELECT pg_catalog.setval('public.favorite_id_seq', 21, true);
SELECT pg_catalog.setval('public.person_id_seq', 17, true);
SELECT pg_catalog.setval('public.tag_id_seq', 18, true);

reset role;
commit;
