-- Inserting sample data for companies with UUIDs
INSERT INTO companies (id, name, description, image, address, city, state, zip, country, website, created_at, updated_at)
VALUES
  ('e1b2b2a0-5b9a-4b9e-9b9a-9b9a9b9a9b9b', 'Google', 'Search engine and technology company', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png', '1600 Amphitheatre Parkway', 'Mountain View', 'CA', '94043', 'USA', 'https://www.google.com', now(), now()),
  ('e1b2b2a0-5b9a-4b9e-9b9a-9b9a9b9a9b9a', 'Facebook', 'Social media platform', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', '1 Hacker Way', 'Menlo Park', 'CA', '94025', 'USA', 'https://www.facebook.com', now(), now()),
  ('2e6e5c24-1d3a-43f3-9822-4c6b9f3ab6d8', 'Dassault', 'Aerospace and defense company', 'https://ih1.redbubble.net/image.4123859191.8890/fposter,small,wall_texture,square_product,600x600.webp', '9 Rond-Point des Champs-Élysées', 'Paris', '', '75008', 'France', 'https://www.dassault-aviation.com', now(), now());

-- Inserting sample data for recruiters with UUIDs and oidc_id as UUID
INSERT INTO recruiters (id, company_id, oidc_id, created_at, updated_at)
VALUES
  ('025e6d46-4f8d-45e4-8c6b-91d1bcee7771', 'e1b2b2a0-5b9a-4b9e-9b9a-9b9a9b9a9b9b', 'a48e04a5-28c1-4d7b-9b25-9769a69b0c12', now(), now()),
  ('aa24a3e3-3844-42fe-9a0a-541924c66b33', 'e1b2b2a0-5b9a-4b9e-9b9a-9b9a9b9a9b9a', 'b9e5b6b0-96ed-4f2e-af7b-1e9b63f72a77', now(), now()),
  ('64c4f873-9be2-4852-809e-b2ec54e75976', '2e6e5c24-1d3a-43f3-9822-4c6b9f3ab6d8', 'c1c7f90f-e510-4c5b-9d27-f16a4c0e2b54', now(), now());
