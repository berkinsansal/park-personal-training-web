-- Site info (single row)
INSERT INTO site_info (ig_handle, phone, address_line1, address_line2, weekday_hours, weekend_hours, happy_customers, years_experience)
VALUES (
  'parkpersonaltraining',
  '05412368206',
  'Park Caddesi 19/A-3',
  'Çankaya / Ankara',
  'Pzt - Cmt: 07:00 - 21:00',
  'Pazar: 09:00 - 17:00',
  500,
  10
);

-- Services
INSERT INTO services (icon, title, description, order_index) VALUES
  ('💪', 'Fitness', 'Kişisel hedeflerine uygun, uzman eğitmen gözetiminde yoğun ve verimli fitness antrenmanları. Vücudunu güçlendir, sağlıklı yaşamı keşfet.', 1),
  ('🧘', 'Pilates', 'Derin kas gruplarını çalıştıran, duruşunu düzelten ve esnekliğini artıran pilates dersleri. Hem zihin hem beden için mükemmel bir denge.', 2),
  ('🥊', 'Boks & Kickboks & Muay Thai', 'Dövüş sporlarının gücünü fitness ile buluşturan dinamik dersler. Kondisyon, koordinasyon ve öz savunma becerilerini aynı anda geliştir.', 3),
  ('🎀', 'Pole Dance', 'Akrobasi ve dansı bir araya getiren, üst vücut gücünü ve esnekliği geliştiren pole dance dersleri. Her seviyeye uygun, eğlenceli bir antrenman.', 4),
  ('🏋️', 'Condition & Strength', 'Kondisyonunu zirveye taşıyan ve kas gücünü sistematik şekilde artıran özel programlar. Performansını bir üst seviyeye çıkar.', 5);

-- Teachers
INSERT INTO teachers (name, ig_handle, initials, order_index) VALUES
  ('Kemal Bilge', 'kemalbilge14', 'KB', 1),
  ('Kadir Özdemir', 'kadrozdemirr', 'KÖ', 2),
  ('Kutlu Olatunji', 'kutluolatunjii', 'KO', 3);
