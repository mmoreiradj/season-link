CREATE TABLE job
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       varchar(100) NOT NULL,
    category_id UUID          NOT NULL,
    UNIQUE (title, category_id)
);

CREATE TABLE job_category
(
    id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    UNIQUE (title)
);

ALTER TABLE job ADD FOREIGN KEY (category_id) REFERENCES job_category (id);

INSERT INTO job_category(id, title)
VALUES ('cff99cd1-fb3e-45f4-8475-10c3ae583028', 'Agriculture, Viticulture, Pêche'), -- 1
       ('187a2176-4054-42b2-9da8-1f566ca6522d', 'Hôtellerie de plein air, Club vacances, Camping, Animation'), -- 2
       ('23858249-781d-49fd-8392-274985e0d44d', 'Hôtels, cafés, bars, restaurants'), -- 3
       ('8e1a1f53-0b79-441f-952f-843540668921', 'Evenementiel'), -- 4
       ('06e0d5c2-f432-4ec2-98a3-77f0d031c30d', 'Casinos, Parcs d''attraction'), -- 5
       ('14058d72-0ce2-43b6-a368-931b047e2349', 'Administration, Espaces culturels, Tourisme'), --6
       ('5019f89c-fb26-424b-92cf-d2f5c3a2893f', 'Montagne, Ski'), --7
       ('7d30a159-067a-4a5b-8836-5c58862f9edc', 'Mer, Plongée, Sports/Loisirs Nautiques'), --8
       ('fd7d8722-4fff-4a4a-ba64-54f66021c54e', 'Sécurité, Gardiennage'), --9
       ('935bcd96-5596-4e1c-8724-2692cd74e4a4', 'Logistique, Transport'), --10
       ('dddacca7-2f85-40fd-807d-8e6392e8127f', 'Baby sitting, Services à la personne'), --11
       ('fad6a1a4-0fb1-42f4-8d86-13f156881643', 'Commerce, Achats, Vente'), --12
       ('bd9ffdde-e47d-40e8-9596-ef04ba3953b4', 'SPA, Esthétique, Coiffure'); --13

-- Agriculture, Viticulture, Pêche (Catégorie 'cff99cd1-fb3e-45f4-8475-10c3ae583028') :
INSERT INTO JOB(id, title, category_id)
values ('9ff7e98d-aa18-429b-a382-1573269233f5', 'Ouvrier.e agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('e9d97a80-f6ec-47ec-9c6d-c2b6ad8bdd98', 'Chef.fe ouvrier.e agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('73be3a64-eec1-400c-82ee-4670e3710662', 'Conduct.eur.rice d''engin agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('f7534675-55e3-45e7-ac36-d8abd6ee694c', 'Ouvrier.e horticole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('30eb467e-3959-4883-8585-42be56f52540', 'Paysagiste', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('b4ee25d7-43bf-4224-a934-58ccb8a2f5e2', 'Maraîcher.e', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('b8bdac7f-4db6-463a-b139-c4ec99fa17b8', 'Mécanicien.ne en matériel agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('82c541c5-5285-4832-8971-b2fc75b8ca87', 'Ouvrier.e forestier.e', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('e96463f0-1b25-40dd-b2f9-03c7b488b4fa', 'Vétérinaire', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('ab4c8c23-971e-450c-bffb-1ac92559d54c', 'Marin-Pêcheur', 'cff99cd1-fb3e-45f4-8475-10c3ae583028');

-- Hôtellerie de plein air, Club vacances, Camping, Animation (Catégorie '187a2176-4054-42b2-9da8-1f566ca6522d') :
INSERT INTO JOB(id, title, category_id)
values ('6692eb84-9095-4a6c-bf13-66e2dc1b083d', 'Animat.eur.rice petite enfance', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('ab65ac5e-37ce-4df5-8f44-19c77b634ed6', 'Animat.eur.rice enfants', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('a24aa69d-256b-4940-81ec-f2796a940aa7', 'Responsable animation enfants', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('38cabc2d-a995-49c3-8553-13f94840d0c2', 'Animat.eur.rice polyvalent', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('735a5610-2155-410a-a2de-6ace2ed709c4', 'Responsable animation', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('9ecd8645-2e6c-454f-9eab-d7652ed30e5a', 'Animat.eur.rice sportif', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('6f06b13b-2676-40f6-ac53-f01dc40ff61a', 'Animat.eur.rice professionnel', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('5a1e3012-c391-444f-9d03-93def99a1d1a', 'Guide-accompagnateur', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('bd10c75c-b189-4035-8c57-0cb6ca434030', 'Directeur d''exploitation', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('de80d0b9-c336-403e-a520-df47a93cd79d', 'Employé.e de parc de loisirs', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('72cb5f9d-d116-4c40-89d5-fd33346045a0', 'Chorégraphe', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('1d93bfc1-35cf-4d4b-9abd-54ad0fc5480d', 'Décorat.eur.rice', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('a778f116-6061-4d5f-a431-b9961988696a', 'Technicien.ne son et lumière', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('467a0b7c-8096-410a-ab41-8421770133f6', 'DJ', '187a2176-4054-42b2-9da8-1f566ca6522d');

-- Hôtels, cafés, bars, restaurants (Catégorie '23858249-781d-49fd-8392-274985e0d44d') :
INSERT INTO JOB(id, title, category_id)
values ('49b3cbd7-d0bb-4d62-bc61-be292bb9ea23', 'Direct.eur.rice d''hôtel', '23858249-781d-49fd-8392-274985e0d44d'),
       ('7472325b-9687-40e5-9aa4-f033f2f2119e', 'Assistant.e de direction', '23858249-781d-49fd-8392-274985e0d44d'),
       ('fcf1a969-4de1-4345-9c2a-c327f2eb7e71', 'Responsable d''hébergement', '23858249-781d-49fd-8392-274985e0d44d'),
       ('91ee2c20-87f9-4c3a-b376-85d858b1fd81', 'Chef.fe réception', '23858249-781d-49fd-8392-274985e0d44d'),
       ('b1e3e856-bdd2-4020-9c73-a6f26c534ec8', 'Réceptionniste', '23858249-781d-49fd-8392-274985e0d44d'),
       ('b3ad7622-ef1d-4acb-99f7-78eddcc2ba5a', 'Night Auditor', '23858249-781d-49fd-8392-274985e0d44d'),
       ('c352ddbb-9725-411f-9f86-68dbff424e6a', 'Chef.fe concierge', '23858249-781d-49fd-8392-274985e0d44d'),
       ('a4da76c3-c0bf-43f9-8f1d-befcc16e54c6', 'Concierge', '23858249-781d-49fd-8392-274985e0d44d'),
       ('c16ae299-d784-4ccc-8508-1994a439963a', 'Portier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('72676f22-ea45-4ac8-8020-951b0f505b5d', 'Chasseur', '23858249-781d-49fd-8392-274985e0d44d'),
       ('061c9666-0e21-4bd5-9b3f-fab67e6bd431', 'Voiturier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('5bee4b19-67d1-40f0-9d17-0290fcd048a9', 'Bagagiste', '23858249-781d-49fd-8392-274985e0d44d'),
       ('a8426be1-c886-4774-9f5d-3db746d0f145', 'Guest relation', '23858249-781d-49fd-8392-274985e0d44d'),
       ('2168a2fb-a774-40ea-ab4f-066b6e78d872',  'Majordome', '23858249-781d-49fd-8392-274985e0d44d'),
       ('44f6c6bb-339c-4ec5-9e0a-d4c3705f3f3a', 'Responsable blanchisserie/lingerie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('63d30d49-e027-4610-a6ca-c87207498337', 'Employé.e de blanchisserie/lingerie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('80fad461-ffc6-48dd-8a68-ee6f06751e8a', 'Employé.e d''étages', '23858249-781d-49fd-8392-274985e0d44d'),
       ('e5e75f71-52ea-4d8d-a3d5-f03756faa273', 'Assistant.e gouvernant.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('5f355616-3882-4b4e-bc31-5117b817bfbb', 'Gouvernant.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('87a1f3b4-5609-4798-b9de-0c95718a2b28', 'Gouvernant.e général.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('b4957cfb-4658-4d37-ba41-657b4f53cee8', 'Employé.e polyvalent', '23858249-781d-49fd-8392-274985e0d44d'),
       ('ddca02e6-8bc8-40a7-b534-b78a11b8b674', 'Equipier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('3c8d942a-9ec6-43fa-90e1-8d4eb494e0af', 'Responsable de maintenance', '23858249-781d-49fd-8392-274985e0d44d'),
       ('485aad58-376c-4e7d-adb0-57c0e711cedc', 'Agent de maintenance', '23858249-781d-49fd-8392-274985e0d44d'),
       ('a84152bf-d9fd-494d-aecc-8b229e3e5e3b', 'House keeping', '23858249-781d-49fd-8392-274985e0d44d'),
       ('975cfd14-4d6f-4e5d-91f5-8997cab5ff2c', 'Jardinier.e paysagiste', '23858249-781d-49fd-8392-274985e0d44d'),
       ('32842218-a626-4f8d-8d56-29b8abb7fde9', 'Manager F&B', '23858249-781d-49fd-8392-274985e0d44d'),
       ('b66a9614-4dfd-4fbb-8dbb-01df3812ff90', 'Direct.eur.rice de restauration', '23858249-781d-49fd-8392-274985e0d44d'),
       ('a668bcdb-29e0-4b87-ac35-1552aeb186c5', 'Maitre.sse d''hôtel', '23858249-781d-49fd-8392-274985e0d44d'),
       ('ce86e730-ce37-4203-b58a-84c0e448416a', 'Assistant.e Maitre.sse d''hôtel', '23858249-781d-49fd-8392-274985e0d44d'),
       ('57b5f82f-5e8f-4a13-aea5-240305f4b951', 'Chef.fe de rang', '23858249-781d-49fd-8392-274985e0d44d'),
       ('9a2fb7b3-69ab-47aa-9b05-11450bcf0371', 'Commis/Runner', '23858249-781d-49fd-8392-274985e0d44d'),
       ('5149bf60-4e88-4697-8f37-27cbfb9348e7', 'Chef.fe sommelier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('abca54ad-7e42-4042-803e-53e6453ce9fa', 'Sommelier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('1ada383e-b8c1-4d90-bc47-68b36608a48d', 'Limonadier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('7e54d760-2c1b-42d5-8aff-3a0731b7fbac', 'Chef.fe bar.wo.man', '23858249-781d-49fd-8392-274985e0d44d'),
       ('bf941dce-41b5-42b1-a2ea-91ba26380818', 'Bar.wo.man', '23858249-781d-49fd-8392-274985e0d44d'),
       ('5142f57e-e5b5-44cc-9325-99ccba55deb7', 'Commis de Bar', '23858249-781d-49fd-8392-274985e0d44d'),
       ('74ad2d8a-9eed-4ec5-84b9-acd0482a8c6a', 'Responsable Room Service', '23858249-781d-49fd-8392-274985e0d44d'),
       ('938aa85d-9e7f-4ff8-8851-792598036cce', 'Room Service', '23858249-781d-49fd-8392-274985e0d44d'),
       ('7712ed3c-4f15-482d-a4b4-0237b0dae9e7', 'Responsable petit déjeuner', '23858249-781d-49fd-8392-274985e0d44d'),
       ('8c9297ef-5240-47cd-a696-6bbeaab36151', 'Hôte.sse d''accueil', '23858249-781d-49fd-8392-274985e0d44d'),
       ('75ca2943-bab5-4ba3-bebd-7af07ec864c6', 'Chef.fe de cuisine', '23858249-781d-49fd-8392-274985e0d44d'),
       ('413ea658-95cc-4e08-b6fa-93b04b272bc7', 'Second de cuisine', '23858249-781d-49fd-8392-274985e0d44d'),
       ('a839746a-76c5-4d81-98b3-acff2d109fc8', 'Chef.fe de partie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('94683114-c9e7-4377-a757-1b5894fa0419', 'Demi chef.fe de partie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('0106b50f-f219-4f46-a527-a0a2508c2e03', 'Commis de cuisine plongeur', '23858249-781d-49fd-8392-274985e0d44d'),
       ('9913b3a7-b993-4258-8894-a5b7bfe0181f', 'Boulanger.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('94bbb955-d1de-4aee-8b80-02b0d2d4e12f', 'Chef.fe pâtissier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('b465c943-a00d-4b8b-be98-6f23d986f252', 'Second de pâtissier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('b8f4d4ab-3ed9-493c-b948-8b09a4d78789', 'Pâtissier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('c4ed92d0-2ccd-4405-a153-8d7c38ede388', 'Chef.fe chocolatier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('75516ad9-8af6-4b23-9439-954ebc3d4691', 'Chocolatier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('c281291f-0b29-4910-be0e-c2c4bcf79a56', 'Pizzaiolo', '23858249-781d-49fd-8392-274985e0d44d'),
       ('acf5e51a-581c-43c8-9484-8dab9e09575d', 'Crêpier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('63a99185-96db-42ac-ad44-63f11536366f', 'Glacier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('f4787242-a349-419c-a50f-1ba877a8fb99', 'Plagiste', '23858249-781d-49fd-8392-274985e0d44d');

-- Evénementiel (Catégorie '8e1a1f53-0b79-441f-952f-843540668921') :
INSERT INTO JOB(id, title, category_id)
values ('0c55481f-2d4c-4545-83fd-320d7ebbb1e9', 'Direct.eur.rice de foire, salon, congrès, exposition', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('be345672-157d-4119-8722-a267da9c68c2', 'Direct.eur.rice de cirque', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('15daa05a-85fb-4abe-b15d-8de2b0969c98', 'Direct.eur.rice d''agence évènementielle', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('a73dd78e-02a6-4661-9a50-40eaa9499dc9', 'Chef.fe de projet événementiel', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('4aa7a262-e9d0-4228-803a-82b936e11f5f', 'Chargé.e de communication événementielle', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('3cd7b0bf-8c3f-4b0a-a6d1-ca191788f613', 'Organisat.eur.rice de spectacles', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('4ed6e24b-e109-462d-bdd3-d2b51475b45b', 'Commissaire de salon/d''exposition', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('e90833de-73ba-4e70-82f0-2484da05ade2', 'Organisat.eur.rice de business event', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('68fd2ced-eb67-4912-9a93-88b5f7cf793b', 'Organisat.eur.rice d''événements', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('e8e1b447-9e92-41f1-acfc-b3daeddf7d95', 'Chef.fe de projet artistique et culturel', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('887b4f2d-4749-4030-abc8-f2e221fa4b78', 'Organisat.eur.rice d''événements culturels et artistiques', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('adb24180-084a-43d3-904c-2b1ef197d11c', 'Organisat.eur.rice d''événements sportifs', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('f004656b-7db5-48e4-a566-d031e3da8eb9', 'Direct.eur.rice de production événementielle', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('6ace57ec-ab6f-46b8-b122-4fb34583c141', 'Médiat.eur.rice culturel', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('aa923e8d-803a-47e0-b323-9894af589346', 'Direct.eur.rice de festival', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('7c14f469-6073-41b7-a757-66cda278ca74', 'Photographe', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('317dcf38-632b-4162-9a4e-38775bf32760', 'Modèle Mannequinat', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('afd1fe9e-76b6-4bbb-9387-5ba12c9b31a9', 'Hôte.sse', '8e1a1f53-0b79-441f-952f-843540668921');

-- Casinos, Parcs d'attraction (Catégorie '06e0d5c2-f432-4ec2-98a3-77f0d031c30d') :
INSERT INTO JOB(id, title, category_id)
values ('9bd9503f-cfcb-425e-8273-599200582d84', 'Direct.eur.rice de parc zoologique', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('2bbd8e31-e542-400c-b66b-4a72561874bf', 'Vétérinaire', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('20c99e57-c0cf-423f-834b-587ba2c95187', 'Chef.fe animalier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('d69ae086-afa9-43ae-882d-7f97c6ae88c4', 'Soignant.e animalier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('eea5b46d-d78a-4c01-b8bf-2f891ce99cce', 'Auxiliaire spécialisé vétérinaire', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('fad42df0-2f5f-4749-a244-ff4c8cfe5a8a', 'Jardinier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('e2c0f110-0277-40b6-a6ba-8aa3fc1817eb', 'Eleveur animalier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('89e80f87-9f67-4c08-a726-cda1a3ca7a3d', 'Fauconnier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('d3740448-d90a-4dbe-90f3-0ce9bd46d333', 'Direct.eur.rice de parc d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('5d3e236f-5808-4345-a986-4b06aa8eb9a0', 'Responsable d''un secteur d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('7121dc9a-30db-4c9e-9e85-8404ceeb30af', 'Pilote d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('f19b4cce-3393-48ed-b7ee-72776fa4c015', 'Hôte.sse de salle de jeux électroniques', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('39adb6ef-ef2c-4b50-ad3f-ae9a7ea1e44f', 'Conduct.eur.rice de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('1eb6e104-1faa-4fb7-8f06-2407eee61fcc', 'Responsable des attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('9b5e8639-4cbb-4e54-8e08-fe37dba49cb0', 'Opérat.eur.rice d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('6a578704-9dcd-4b38-8955-c8c56ec88c92', 'Hôte.sse de patinoire', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('6b659b62-1973-49b6-9a43-43dffe28d9d4', 'Hôte.sse de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('fac40a6d-300b-4dd7-be95-0449301e5d08', 'Employé.e de parc de loisirs', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('ee900951-9e8f-4095-899c-9fe89f61092e', 'Ouvreu.r.se de salle de spectacles', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('3b0d0e7a-e468-42b4-8980-d183642dbe9a', 'Pilote de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('4aa3e175-16eb-4f29-8582-16fa8bc1c309', 'Opérat.eur.rice de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('ada9cf64-0479-4086-a3de-1cd46f765ca5', 'Ouvreu.r.se placeu.r.se de salle de spectacles', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('60cd01b8-2afb-411b-a6fb-d457dce6934d', 'Employé.e de manège forain', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('d7891618-e0f5-4da6-ab3a-5c242cd9b2fe', 'Agent.e d''exploitation des attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('e37a7a74-72ac-4101-9606-1fd46f3b4949', 'Agent.e de contrôle de salle de spectacles', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('55d798f4-d262-41f8-adcb-b075c3f3c3bf', 'Assistant.e de zone d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('91d8eeaf-3f73-4ffc-8d9f-b2390f211d03', 'Conduct.eur.rice d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('3fcd87bc-1ed5-44b1-84bf-a0a4fd6c98b4', 'Hôte.sse d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('65f44bc0-38f1-41df-82b2-fe03d3b712d1', 'Employé.e de loisirs ou d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('fc4bd557-cd56-4679-a991-13b8c3aaf228', 'Animat.eur.rice de parc de loisirs', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('4d69f76d-e8d2-4bb3-b7ea-537283300f1f', 'Animat.eur.rice de personnage de parc de loisirs', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('8666f281-4ffd-435e-be58-300d3193a6d9', 'Animat.eur.rice d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('cba8a620-372f-40c4-849c-22fdb816935c', 'Opérat.eur.rice de parcours acrobatique dans les arbres', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('e45bc419-08ef-4d13-b951-e5b5d554ddc8', 'Hôte.sse de golf/mini-golf', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('d18a1d39-b4fe-4d3c-b779-ead131372913', 'Billettiste', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('6e453785-dcef-44a2-ae4f-4902bb5be025', 'Direct.eur.rice de casino', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('d20f632a-6563-4ab7-bc69-a780d2eec299', 'Chef.fe croupier.re', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('e4354231-408b-43da-965a-2ebacad246ea', 'Croupier.re', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('db44ba6e-986e-4105-9bd5-88866af0333f', 'Responsable clientèle', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('896defb1-2ba7-4acd-9fce-a1cafae5cb81', 'Agent de sécurité', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('0a374cd3-e384-4f15-b2a5-819c85dfed1e', 'Opérat.eur.rice de vidéosurveillance', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('1790065b-52c4-4456-b95c-ab26331cb657', 'Banquier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('d7aa0ab9-8d4e-42b3-99b6-e2b13aaddcc4', 'Gestionnaire de fond', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('69ee4c92-23fd-477f-80ce-0615179e9263', 'Technicien machine à sous', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('4e0e49ed-719a-4ef4-b62b-9bbb1f4e5779', 'Contrôleur auditeur de machines à sous', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d');

-- Administration, Espaces culturels, Office du Tourisme (Catégorie '14058d72-0ce2-43b6-a368-931b047e2349') :
INSERT INTO JOB(id, title, category_id)
values ('1cca5fbf-eb46-4eb2-820f-5eb71e36f3c6', 'Direct.eur.rice d''office de tourisme', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('65acd269-2dbb-4da4-ab3e-4136663e575a', 'Direct.eur.rice de site culturel', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('15cededb-0915-4d45-8d47-639e459ae1b3', 'Responsable de réservation', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('62747302-ebc0-41a3-9a6b-80f6e8af8284', 'Agent d''accueil', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('2047ded6-6d2b-4c0f-af69-6c6e8769b551', 'Agent polyvalent', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('a28383ae-f3e7-4296-a718-10cb7076a047', 'Guide accompagnateur', '14058d72-0ce2-43b6-a368-931b047e2349');

-- Montagne, Ski (Catégorie '5019f89c-fb26-424b-92cf-d2f5c3a2893f') :
INSERT INTO JOB(id, title, category_id)
values ('b51e593e-eb67-45a9-ae69-cad09e7f091d', 'Chef.fe d''exploitation de remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('1a4b53b5-11db-4f4c-a806-22f949a105a3', 'Electromécanicien.ne en remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('b4432423-b60a-4ea4-be8b-2077b0e9c255', 'Installateur en remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('56c714a5-09a2-42bd-b01e-d2832ce98c73', 'Conducteu.r.se de remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('4c17b0d8-0bbe-43a2-a4a9-b9057a4d54f3', 'Caissier.e en remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('352de1a1-8b0c-46e7-924a-a3cfeec152d4', 'Agent d''accueil', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('80c1ddfb-7a27-4fa6-b695-3ff168645411', 'Employé.e d''équipement de sports et de loisirs', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('e3c900c4-887f-49f1-b037-5a68f3f2fd6b', 'Accompagnat.eur.rice en montagne', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('6e05c45e-5201-4853-8667-7966ba167dfd', 'Moniteur.e de ski', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('e415b473-3fd2-4e90-85fe-792ddaa1680e', 'Moniteur.e de randonnée', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('a93af005-0762-47ff-9390-e940fc3e0c07', 'Moniteur.e d''escalade', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('7b051509-ce51-4347-bcad-1510b6402ecf', 'Moniteur.e de moto neige', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('a466da2e-e0fc-4afe-ac73-ec5b1e19f0f7', 'Ski.wo.man', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('3f537c3b-315c-4932-a2da-228fb6d76589', 'Conducteur d''engins de Damage', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('93046b10-1358-4198-b26e-19198900d649', 'Perchiste', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('26b6061c-8fde-4fc5-b0ab-ea97fafe2af8', 'Pisteu.r.se secouriste', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('c83c707a-45bb-4f13-8d88-414aaca9b533', 'Nivocult.eur.rice', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('cd34215f-255e-41f7-bfd3-181227ca0994', 'Artificier.e', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('b85e4ae2-171d-494e-8566-2c25ab1f1b41', 'Maitre.sse chien d''avalanche', '5019f89c-fb26-424b-92cf-d2f5c3a2893f');

-- Mer, Plongée, Sports/Loisirs Nautiques (Catégorie '7d30a159-067a-4a5b-8836-5c58862f9edc') :
INSERT INTO JOB(id, title, category_id)
values ('cb352a0b-2d0b-4222-8957-9b66c554158b', 'Plagiste', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('9104f72f-3f56-4dca-a4e6-f89284ded2b8', 'Vendeu.r.se ambulant.e de glace ou de beignets', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('13d4c1d3-44bf-432e-8095-3907a028d4f6', 'Animat.eur.rice de club de plage', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('dff010f1-2af0-49a8-bf74-dc57665abc04', 'Nageu.r.se sauveteur', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('78a7195f-28e8-4c59-904b-1b9a210ea276', 'Monit.eur.rice d''activités nautiques', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('7d7f5944-b1c7-4880-85e1-3ec551cc1b5f', 'Surveillant.e de baignade', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('40bb87a1-431d-4d08-b92f-52da115e5907', 'Monit.eur.rice de plongée', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('1b4f28ca-2e97-4640-8bbd-6c302a036f0e', 'Employé.e de Capitainerie', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('35ef6c4f-3b27-4253-8ec4-a6412f85de75', 'Mécanicien.ne de bateaux', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('ccfcdf44-a83b-4d84-8ef4-0e2dc2819521', 'Equipage de bateaux', '7d30a159-067a-4a5b-8836-5c58862f9edc');

-- Sécurité, Gardiennage (Catégorie 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'):
INSERT INTO JOB(id, title, category_id)
values ('9e7eecfe-e757-44a8-9317-00a1bc8eb1a6', 'Garde rapprochée', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('9ccecf5d-d3ee-41df-8776-e4ffc1394c67', 'Agent de sécurité', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('6f52de65-9ac4-446f-b9d8-7dbf0be5adcb', 'Opérat.eur.rice de vidéosurveillance', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('177f9c72-abde-480f-8238-81aca8a99288', 'Maitre.sse de chien', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('f499519c-10b0-41d5-a617-3b54f8e55996', 'ASVP', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('21ddbcdd-0a40-4abb-8b6a-6999bc901496', 'Gardien.ne', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e');

-- Logistique, Transport (Catégorie '935bcd96-5596-4e1c-8724-2692cd74e4a4') :
INSERT INTO JOB(id, title, category_id)
values ('9d346653-d419-4bd1-a269-e635ca34d579', 'Magasinier.e', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('119140a3-074b-4bd2-9361-8ce3f033915b', 'Chef magasinier', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('6993e65c-cffe-44d4-948a-c6cf484bb210', 'Préparat.eur.rice de commande', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('d57adce7-56b4-47be-828b-d170a3595c38', 'Cariste', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('0f9ed987-ac88-4027-a40c-99b9bbb56fa9', 'Manutentionnaire', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('3e2587b2-267c-4d89-a82d-7a25eacc7ab7', 'Opérat.eur.rice', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('1ac12460-75ff-4e32-bee3-71e5a7390d18', 'Chauffeur livreur', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('5bdbe612-599f-482a-958a-854e3d8a8bc3', 'Chauffeur routier', '935bcd96-5596-4e1c-8724-2692cd74e4a4');

-- Babysitting, Services à la personne (Catégorie 'dddacca7-2f85-40fd-807d-8e6392e8127f') :
INSERT INTO JOB(id, title, category_id)
values ('dcffd284-08db-45d6-8646-d110d53251cf', 'Garde d''enfants', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('4d478249-c03e-4244-a43c-7f009727e32a', 'Garde périscolaire', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('f02ec30c-2b10-4b60-a33b-76f2722753c9', 'Aide aux devoirs', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('5326dcfc-0466-4af2-8288-87b94db762dd', 'Animat.eur.rice d''anniversaire', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('6c868e2d-1952-46e9-8eb2-026939b76d83', 'Accompagnat.eur.rice de vacances', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('f3f6f0dd-5865-472e-b9bc-6cebd48f78de', 'Aide à la personne', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('25d95d60-27f7-4477-a34e-557eac8992d0', 'Livreur à domicile', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('34c9e209-ba4d-496a-8e5f-40d6101afa72', 'Chauffeur VTC', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('14226752-acee-41c6-8cc6-27934ccb7881', 'Aide au ménage', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('60d8e269-48f7-494f-ab7a-4c149122c3a1', 'Paysagiste jardinier arboriste', 'dddacca7-2f85-40fd-807d-8e6392e8127f');

-- Commerce, Achats, Vente (Catégorie 'fad6a1a4-0fb1-42f4-8d86-13f156881643') :
INSERT INTO JOB(id, title, category_id)
values ('96bc12e5-bce1-4fce-9509-3ff6bdaf64b0', 'Billettiste', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('4c97616f-f229-44de-b8a6-350016957dd7', 'Responsable de réservation', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('d84793fe-e840-4290-9c93-861510fb126f', 'Responsable de vente', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('86169210-ed57-47b0-aed0-bd2bbd2b0fee', 'Responsable de magasin', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('639bac0c-d58b-408d-9976-9e316852cca2', 'Assistant.e responsable magasin', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('9360f265-43ba-4fca-975b-0bacf872eb8d', 'Vend.eur.se', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('6d04796c-a848-440f-a40a-facf9b24b408', 'Négociant.e', 'fad6a1a4-0fb1-42f4-8d86-13f156881643');

-- SPA, Esthétique, Coiffure (Catégorie 13) :
INSERT INTO JOB(id, title, category_id)
values ('dc4f4ad9-8436-4c65-8461-69771ce41459', 'SPA manager', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('d5101ec5-eed2-49f7-b76d-dfacf755682a', 'Praticien.ne SPA', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('71d85846-1eb2-4fd8-bb47-f0dc4518412c', 'Hôte.sse d''accueil', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('278c637c-5b20-4e9c-8874-891dd0d66bf6', 'Esthéticien.ne', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('a358d9de-8214-4646-b3b3-e1ce8fe8d4ee', 'Maquilleu.r.se', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('4cdd53dd-f939-4ac1-b82b-054ea242f532', 'Métiers de l''onglerie', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('cae69c36-20d7-4e1f-90b1-a8e91a2c38e4', 'Masseu.r.se', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('3f12a516-284c-4bc4-91c6-8c694a803193', 'Coiffeu.r.se', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4');
