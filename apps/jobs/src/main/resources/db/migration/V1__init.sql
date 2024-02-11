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
insert into job(title, category_id)
values ('Ouvrier.e agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Chef.fe ouvrier.e agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Conduct.eur.rice d''engin agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Ouvrier.e horticole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Paysagiste', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Maraîcher.e', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Mécanicien.ne en matériel agricole', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Ouvrier.e forestier.e', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Vétérinaire', 'cff99cd1-fb3e-45f4-8475-10c3ae583028'),
       ('Marin-Pêcheur', 'cff99cd1-fb3e-45f4-8475-10c3ae583028');

-- Hôtellerie de plein air, Club vacances, Camping, Animation (Catégorie '187a2176-4054-42b2-9da8-1f566ca6522d') :
insert into job(title, category_id)
values ('Animat.eur.rice petite enfance', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Animat.eur.rice enfants', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Responsable animation enfants', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Animat.eur.rice polyvalent', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Responsable animation', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Animat.eur.rice sportif', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Animat.eur.rice professionnel', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Guide-accompagnateur', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Directeur d''exploitation', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Employé.e de parc de loisirs', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Chorégraphe', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Décorat.eur.rice', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('Technicien.ne son et lumière', '187a2176-4054-42b2-9da8-1f566ca6522d'),
       ('DJ', '187a2176-4054-42b2-9da8-1f566ca6522d');

-- Hôtels, cafés, bars, restaurants (Catégorie '23858249-781d-49fd-8392-274985e0d44d') :
INSERT INTO job(title, category_id)
values ('Direct.eur.rice d''hôtel', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Assistant.e de direction', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Responsable d''hébergement', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe réception', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Réceptionniste', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Night Auditor', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe concierge', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Concierge', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Portier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chasseur', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Voiturier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Bagagiste', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Guest relation', '23858249-781d-49fd-8392-274985e0d44d'),
       ( 'Majordome', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Responsable blanchisserie/lingerie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Employé.e de blanchisserie/lingerie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Employé.e d''étages', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Assistant.e gouvernant.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Gouvernant.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Gouvernant.e général.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Employé.e polyvalent', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Equipier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Responsable de maintenance', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Agent de maintenance', '23858249-781d-49fd-8392-274985e0d44d'),
       ('House keeping', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Jardinier.e paysagiste', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Manager F&B', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Direct.eur.rice de restauration', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Maitre.sse d''hôtel', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Assistant.e Maitre.sse d''hôtel', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe de rang', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Commis/Runner', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe sommelier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Sommelier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Limonadier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe bar.wo.man', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Bar.wo.man', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Commis de Bar', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Responsable Room Service', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Room Service', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Responsable petit déjeuner', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Hôte.sse d''accueil', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe de cuisine', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Second de cuisine', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe de partie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Demi chef.fe de partie', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Commis de cuisine plongeur', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Boulanger.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe pâtissier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Second de pâtissier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Pâtissier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chef.fe chocolatier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Chocolatier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Pizzaiolo', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Crêpier.e', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Glacier', '23858249-781d-49fd-8392-274985e0d44d'),
       ('Plagiste', '23858249-781d-49fd-8392-274985e0d44d');

-- Evénementiel (Catégorie '8e1a1f53-0b79-441f-952f-843540668921') :
INSERT INTO job(title, category_id)
values ('Direct.eur.rice de foire, salon, congrès, exposition', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Direct.eur.rice de cirque', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Direct.eur.rice d''agence évènementielle', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Chef.fe de projet événementiel', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Chargé.e de communication événementielle', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Organisat.eur.rice de spectacles', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Commissaire de salon/d''exposition', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Organisat.eur.rice de business event', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Organisat.eur.rice d''événements', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Chef.fe de projet artistique et culturel', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Organisat.eur.rice d''événements culturels et artistiques', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Organisat.eur.rice d''événements sportifs', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Direct.eur.rice de production événementielle', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Médiat.eur.rice culturel', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Direct.eur.rice de festival', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Photographe', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Modèle Mannequinat', '8e1a1f53-0b79-441f-952f-843540668921'),
       ('Hôte.sse', '8e1a1f53-0b79-441f-952f-843540668921');

-- Casinos, Parcs d'attraction (Catégorie '06e0d5c2-f432-4ec2-98a3-77f0d031c30d') :
INSERT INTO job(title, category_id)
values ('Direct.eur.rice de parc zoologique', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Vétérinaire', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Chef.fe animalier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Soignant.e animalier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Auxiliaire spécialisé vétérinaire', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Jardinier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Eleveur animalier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Fauconnier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Direct.eur.rice de parc d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Responsable d''un secteur d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Pilote d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Hôte.sse de salle de jeux électroniques', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Conduct.eur.rice de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Responsable des attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Opérat.eur.rice d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Hôte.sse de patinoire', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Hôte.sse de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Employé.e de parc de loisirs', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Ouvreu.r.se de salle de spectacles', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Pilote de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Opérat.eur.rice de manège', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Ouvreu.r.se placeu.r.se de salle de spectacles', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Employé.e de manège forain', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Agent.e d''exploitation des attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Agent.e de contrôle de salle de spectacles', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Assistant.e de zone d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Conduct.eur.rice d''attraction', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Hôte.sse d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Employé.e de loisirs ou d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Animat.eur.rice de parc de loisirs', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Animat.eur.rice de personnage de parc de loisirs', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Animat.eur.rice d''attractions', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Opérat.eur.rice de parcours acrobatique dans les arbres', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Hôte.sse de golf/mini-golf', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Billettiste', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Direct.eur.rice de casino', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Chef.fe croupier.re', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Croupier.re', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Responsable clientèle', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Agent de sécurité', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Opérat.eur.rice de vidéosurveillance', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Banquier', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Gestionnaire de fond', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Technicien machine à sous', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d'),
       ('Contrôleur auditeur de machines à sous', '06e0d5c2-f432-4ec2-98a3-77f0d031c30d');

-- Administration, Espaces culturels, Office du Tourisme (Catégorie '14058d72-0ce2-43b6-a368-931b047e2349') :
INSERT INTO job(title, category_id)
values ('Direct.eur.rice d''office de tourisme', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('Direct.eur.rice de site culturel', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('Responsable de réservation', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('Agent d''accueil', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('Agent polyvalent', '14058d72-0ce2-43b6-a368-931b047e2349'),
       ('Guide accompagnateur', '14058d72-0ce2-43b6-a368-931b047e2349');

-- Montagne, Ski (Catégorie '5019f89c-fb26-424b-92cf-d2f5c3a2893f') :
INSERT INTO job(title, category_id)
values ('Chef.fe d''exploitation de remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Electromécanicien.ne en remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Installateur en remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Conducteu.r.se de remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Caissier.e en remontée mécanique', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Agent d''accueil', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Employé.e d''équipement de sports et de loisirs', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Accompagnat.eur.rice en montagne', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Moniteur.e de ski', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Moniteur.e de randonnée', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Moniteur.e d''escalade', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Moniteur.e de moto neige', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Ski.wo.man', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Conducteur d''engins de Damage', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Perchiste', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Pisteu.r.se secouriste', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Nivocult.eur.rice', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Artificier.e', '5019f89c-fb26-424b-92cf-d2f5c3a2893f'),
       ('Maitre.sse chien d''avalanche', '5019f89c-fb26-424b-92cf-d2f5c3a2893f');

-- Mer, Plongée, Sports/Loisirs Nautiques (Catégorie '7d30a159-067a-4a5b-8836-5c58862f9edc') :
INSERT INTO job(title, category_id)
values ('Plagiste', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Vendeu.r.se ambulant.e de glace ou de beignets', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Animat.eur.rice de club de plage', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Nageu.r.se sauveteur', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Monit.eur.rice d''activités nautiques', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Surveillant.e de baignade', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Monit.eur.rice de plongée', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Employé.e de Capitainerie', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Mécanicien.ne de bateaux', '7d30a159-067a-4a5b-8836-5c58862f9edc'),
       ('Equipage de bateaux', '7d30a159-067a-4a5b-8836-5c58862f9edc');

-- Sécurité, Gardiennage (Catégorie 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'):
INSERT INTO job(title, category_id)
values ('Garde rapprochée', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('Agent de sécurité', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('Opérat.eur.rice de vidéosurveillance', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('Maitre.sse de chien', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('ASVP', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e'),
       ('Gardien.ne', 'fd7d8722-4fff-4a4a-ba64-54f66021c54e');

-- Logistique, Transport (Catégorie '935bcd96-5596-4e1c-8724-2692cd74e4a4') :
INSERT INTO job(title, category_id)
values ('Magasinier.e', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Chef magasinier', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Préparat.eur.rice de commande', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Cariste', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Manutentionnaire', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Opérat.eur.rice', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Chauffeur livreur', '935bcd96-5596-4e1c-8724-2692cd74e4a4'),
       ('Chauffeur routier', '935bcd96-5596-4e1c-8724-2692cd74e4a4');

-- Babysitting, Services à la personne (Catégorie 'dddacca7-2f85-40fd-807d-8e6392e8127f') :
INSERT INTO job(title, category_id)
values ('Garde d''enfants', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Garde périscolaire', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Aide aux devoirs', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Animat.eur.rice d''anniversaire', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Accompagnat.eur.rice de vacances', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Aide à la personne', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Livreur à domicile', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Chauffeur VTC', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Aide au ménage', 'dddacca7-2f85-40fd-807d-8e6392e8127f'),
       ('Paysagiste jardinier arboriste', 'dddacca7-2f85-40fd-807d-8e6392e8127f');

-- Commerce, Achats, Vente (Catégorie 'fad6a1a4-0fb1-42f4-8d86-13f156881643') :
INSERT INTO job(title, category_id)
values ('Billettiste', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('Responsable de réservation', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('Responsable de vente', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('Responsable de magasin', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('Assistant.e responsable magasin', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('Vend.eur.se', 'fad6a1a4-0fb1-42f4-8d86-13f156881643'),
       ('Négociant.e', 'fad6a1a4-0fb1-42f4-8d86-13f156881643');

-- SPA, Esthétique, Coiffure (Catégorie 13) :
INSERT INTO job(title, category_id)
values ('SPA manager', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Praticien.ne SPA', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Hôte.sse d''accueil', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Esthéticien.ne', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Maquilleu.r.se', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Métiers de l''onglerie', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Masseu.r.se', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4'),
       ('Coiffeu.r.se', 'bd9ffdde-e47d-40e8-9596-ef04ba3953b4');
