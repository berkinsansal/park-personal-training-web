-- Site info (single row)
INSERT INTO site_info (ig_handle, phone, email, address_line1, address_line2, weekday_hours, weekend_hours, address_line1_en, address_line2_en, weekday_hours_en, weekend_hours_en, happy_customers, years_experience, latitude, longitude)
VALUES (
  'parkpersonaltraining',
  '05412368206',
  'info@parkpersonaltraining.com',
  'Park Caddesi 19/A-3',
  'Çankaya / Ankara',
  'Pzt - Cmt: 07:00 - 21:00',
  'Pazar: 09:00 - 17:00',
  '19/A-3 Park Street',
  'Çankaya / Ankara',
  'Mon - Sat: 07:00 - 21:00',
  'Sun: 09:00 - 17:00',
  500,
  10,
  39.86198383858591,
  32.673266845737885
);

-- Services
INSERT INTO services (icon, title, description, title_en, description_en, order_index) VALUES
  ('💪', 'Fitness', 'Kişisel hedeflerine uygun, uzman eğitmen gözetiminde yoğun ve verimli fitness antrenmanları. Vücudunu güçlendir, sağlıklı yaşamı keşfet.', 'Fitness', 'Intense and effective fitness training supervised by expert trainers, tailored to your personal goals. Strengthen your body and discover a healthy lifestyle.', 1),
  ('🧘', 'Pilates', 'Derin kas gruplarını çalıştıran, duruşunu düzelten ve esnekliğini artıran pilates dersleri. Hem zihin hem beden için mükemmel bir denge.', 'Pilates', 'Pilates classes that work deep muscle groups, correct your posture, and improve flexibility. A perfect balance for both mind and body.', 2),
  ('🥊', 'Boks & Kickboks & Muay Thai', 'Dövüş sporlarının gücünü fitness ile buluşturan dinamik dersler. Kondisyon, koordinasyon ve öz savunma becerilerini aynı anda geliştir.', 'Boxing & Kickboxing & Muay Thai', 'Dynamic classes that combine the power of combat sports with fitness. Develop conditioning, coordination, and self-defense skills simultaneously.', 3),
  ('🎀', 'Pole Dance', 'Akrobasi ve dansı bir araya getiren, üst vücut gücünü ve esnekliği geliştiren pole dance dersleri. Her seviyeye uygun, eğlenceli bir antrenman.', 'Pole Dance', 'Pole dance classes that combine acrobatics and dance, developing upper body strength and flexibility. A fun workout suitable for all levels.', 4),
  ('🏋️', 'Condition & Strength', 'Kondisyonunu zirveye taşıyan ve kas gücünü sistematik şekilde artıran özel programlar. Performansını bir üst seviyeye çıkar.', 'Condition & Strength', 'Special programs that take your conditioning to the peak and systematically increase muscle strength. Take your performance to the next level.', 5);

-- Teachers
INSERT INTO teachers (name, ig_handle, order_index) VALUES
  ('Kemal Bilge', 'kemalbilge14', 1),
  ('Kadir Özdemir', 'kadrozdemirr', 2),
  ('Kutlu Olatunji', 'kutluolatunjii', 3);

-- Playlists
INSERT INTO playlists (spotify_id, order_index) VALUES
  ('37i9dQZF1DX8FwnYE6PRvL', 1),
  ('37i9dQZF1DX32NsLKyzScr', 2),
  ('37i9dQZF1DX8a1tdzq5tbM', 3);

-- Gallery (with placeholder URLs - will be replaced with actual uploads)
INSERT INTO gallery (image_url, alt_text, order_index) VALUES
  ('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop', 'Modern gym equipment and training space', 1),
  ('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop', 'Group fitness class in session', 2),
  ('https://images.unsplash.com/photo-1539571696357-5a69c006b310?w=800&h=600&fit=crop', 'Personal training one-on-one session', 3);
