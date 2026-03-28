# Phase 1 Translation — Cumulative Installments 01–17

Work: **Nafa'is al-Bayan — Commentary on al-Fara'id al-Hisan**

Scope: book pages 22–49; Madkhal / Introduction; Surat al-Fatihah; Surat al-Baqarah; Surat Al 'Imran; Surat al-Nisa'; Surat al-Ma'idah; Surat al-An'am; Surat al-A'raf; Surat al-Anfal; Surat al-Tawbah; Surat Yunus; Surat Hud; Surat al-Ra'd; Surat Ibrahim; Surat al-Isra'; Surat al-Kahf; Surat Maryam; Surat Taha; Surat al-Anbiya'; Surat al-Hajj; Surat al-Mu'minun; Surat al-Nur; Surat al-Shu'ara'.

Translation register: technical, literal, readable.

Source note:
- Arabic technical labels such as basmalah, fasilah, ra's al-ayah, Shami, and Iraqi are retained where helpful.
- Collective labels are translated but not yet normalized into machine codes in this file.
- The Arabic source in these installments has been lightly normalized where OCR or HTML artifacts were plainly mechanical and the intended reading is fixed by the prose commentary.
- Substantive footnotes are preserved as separate technical note segments when they affect later extraction.
- The title markup inherited from the source HTML has been removed as a mechanical artifact.
- This source heading covers two surahs together; the shared title is preserved, while prose segments are assigned to the relevant surah where the commentary itself makes the transition explicit.
- One poem line straddles the end of the al-An'am material and the start of the al-A'raf material, so it is preserved as a shared segment.
- One poem line in the al-Anfal/al-Tawbah block spans the final al-Anfal item and the first al-Tawbah item; it is preserved as a shared segment, with the prose split where the author turns from one surah to the next.
- A commentary sentence interrupted by the printed page boundary has been rejoined mechanically where the continuation is explicit.
- The author's backward cross-reference to the earlier rule on surah openings is preserved explicitly where it appears.
- The Hud material contains a likely OCR disturbance in the third poem line and the matching prose gloss; the earlier matn page in the same source supports the reading شاميهم / الشامي, which is adopted here.
- In the Ra'd material, the phrase 'before it' is preserved as a statement of sequence in recitation, not as a restrictive qualifier, because the commentator explicitly says it functions only as bayan al-waqi'.
- The closing summary of disputed places is separated as its own completion segment for easier later extraction.
- In the Ibrahim material, the commentary's reading ممدودا is normalized to معدودا as a plain mechanical disturbance, since the passage is discussing whether a phrase is counted as a verse ending.
- The poem's shorthand phrase كلا النور is unpacked in English as the two occurrences of {ila al-nur}, following the author's own completion note.
- The opening al-Isra'/al-Kahf unit spans both surahs in a single poem-commentary segment and is preserved as a shared segment.
- The authorial footnote comparing zar'an and abadan is preserved as a separate technical note segment.
- In the poem line on Maryam, the OCR reading مد is normalized to مدا, since the commentary itself glosses it as كلمة "مدا" الأولى and the earlier running matn page supports the same reading.
- The final sentence of the commentary, which adds {kaf ha ya 'ayn sad} as a third disputed place, is separated as a technical note segment for easier later extraction.
- This printed page begins Surat Taha immediately after the Maryam material; the installment stops cleanly at the end of Surat Maryam.
- In the Taha material, the poem/commentary reading تخزن is normalized to تحزن, and the prose reading للاحتزاز is normalized to للاحتراز, as plain OCR disturbances.
- The Taha completion is preserved as its own segment and explicitly adds {Ta Ha} as the twenty-second disputed place omitted from the poem.
- The Taha material resumes on the same printed page where the Maryam material ended, and the next titled block begins later on the same printed page after the Taha completion.
- In the al-Anbiya'/al-Hajj block, the second poem line appears on the commentary page without the lam of للمكي; the earlier running matn page in the same source preserves it, and that reading is adopted here.
- The Makkan disagreement over {huwa sammakumu al-muslimin} is preserved as a separate technical note segment because it affects later structured extraction.
- The closing sentence listing the five disputed places in Surat al-Hajj is preserved as a completion segment.
- This shared source block begins on the same printed page where the Taha completion ended.
- This shared source block begins on the same printed page where the al-Hajj material ended.
- The shared source heading covers Surat al-Mu'minun and Surat al-Nur together, so the title and poem are preserved as shared segments while the prose is assigned to the relevant surah where the commentary itself shifts.
- In the Nur material, the phrase 'for these' is kept explicit because it resolves the shorthand Iraqi into the Basran and the Kufan.
- The distinction between bi-al-absar and li-uli al-absar is preserved explicitly so it cannot be confused with the unanimously counted {taqallabu fihi al-qulubu wa al-absar}.
- The closing sentence listing the three disputed places in Surat al-Nur is preserved as a completion segment.
- In the Shu'ara' material, the qualifiers 'first' and 'third' are preserved explicitly because the commentator uses them to distinguish repeated occurrences of the same terminal word within the surah.
- The phrase bihi al-shayatin is preserved with its prefixed bi-, because the commentator explicitly uses that preposition to distinguish it from the other shayatin occurrence in the surah.
- The closing tanbih that adds {Ta Sin Mim} as a fourth disputed place is separated as a technical note segment.

## nfb.title.main

**Section (Arabic):** نفائس البيان-شرح الفرائد الحسان  
**Section (English):** Nafa'is al-Bayan — Commentary on al-Fara'id al-Hisan  
**Kind:** title  
**Book page(s):** 22

### Arabic

نفائس البيان-شرح الفرائد الحسان

### English

Nafa'is al-Bayan — A Commentary on al-Fara'id al-Hisan.

## nfb.title.intro

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** title  
**Book page(s):** 22

### Arabic

مدخل

### English

Introduction.

## nfb.intro.preface

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** preface  
**Book page(s):** 22

### Arabic

بسم الله الرحمن الرحيم
الحمد لله رب العالمين، والصلاة والسلام على سيدنا محمد هادي الخلق إلى طريق الحق، وعلى آله وصحبه والتابعين. أما بعد. فيقول العبد الفقير إلى لطف ربه الغني: عبد الفتاح بن عبد الغني القاضي لقبا، الشافعي مذهبا، الأزهري تربية، النقشبندي طريقة، الدمنهوري بلدا. هذا شرح وجيز لنظمي في علم الفواصل المسمي "الفرائد الحسان في عد آي القرآن" عمدت فيه إلى عذوبة اللفظ، وسهولة العبارة، وسلاسة التركيب، والله أسأل أن يجنبني عثرة اللسان، وزلة القدم، ويمنحني الإخلاص فيما قصدته من تقريب هذا العلم، وتيسيره على الطالبين وهو حسبي ونعم الوكيل.

### English

In the name of God, the Most Compassionate, the Most Merciful.

Praise belongs to God, Lord of the worlds; blessings and peace be upon our master Muhammad, the guide of creation to the path of truth, and upon his family, his Companions, and the Followers. To proceed: the servant who stands in need of the kindness of his Self-Sufficient Lord—'Abd al-Fattah ibn 'Abd al-Ghani al-Qadi by epithet, Shafi'i in legal school, Azhari in upbringing, Naqshbandi in path, and Damanhuri in hometown—says: This is a brief commentary on my poem on the science of fawasil, entitled al-Fara'id al-Hisan fi 'Add Ay al-Qur'an. In it I have aimed at sweetness of wording, ease of expression, and smoothness of composition. I ask God to spare me a slip of the tongue and a stumble of the foot, and to grant me sincerity in what I intended by bringing this science nearer and making it easier for students. He is sufficient for me, and the best Trustee.

## nfb.intro.poem.praise

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** poem  
**Book page(s):** 22

### Arabic

أحمد ربي وأصلي سرمدا ... على رسول الله مصباح الهدى

### English

I praise my Lord and send blessings without end upon the Messenger of God, the lamp of guidance.

## nfb.intro.commentary.praise

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** commentary  
**Book page(s):** 22

### Arabic

وأقول: الحمد، معناه الثناء على الله تعالى على جهة التعظيم، والصلاة من الله تعالى: الرحمة والإحسان، ومن العبد التضرع والدعاء، والسرمد: الدائم، وقد بدأت نظمي بالحمد تأسيا بالقرآن الكريم حيث كانت أول سورة منه مبدوءة بالحمد، وثنيت بالصلاة على رسول الله -ﷺ- لعظيم فضلها، وكثرة أجرها. كما وردت بذلك صحاح الأحاديث، وحسبنا في ذلك قوله -ﷺ: "من صلى علي صلاة واحدة صلى الله عليه بها عشرا" رواه مسلم، والمعنى: أثنى علي خالقي، ومدبر أمري بما هو أهل له، وأسأله ﵎ أن يصلي على رسول الله -ﷺ- صلاة ترفع درجاته، وتزيد في كماله، صلاة دائمة لا انقطاع لها فإنه ﵊ قد هدانا إلى النور المبين، والصراط المستقيم.

### English

By al-hamd is meant praising God Most High in a manner of exaltation. Salah from God means mercy and beneficence; from the servant it means humble entreaty and supplication. Sarmad means perpetual. I began my poem with praise in imitation of the Noble Qur'an, since its opening surah begins with praise, and I followed it with prayer upon the Messenger of God—peace and blessings be upon him—because of its immense merit and abundant reward. Sound hadiths have come on this point. It is enough here to cite his saying—peace and blessings be upon him—'Whoever sends one prayer upon me, God sends ten upon him,' as narrated by Muslim. The meaning, then, is: I praise my Creator and the One who manages my affairs with the praise that befits Him, and I ask Him, mighty and majestic, to send blessings upon the Messenger of God—peace and blessings be upon him—a prayer that raises his rank and increases his perfection, a perpetual prayer without cessation, for he has guided us to the clear light and the straight path.

## nfb.intro.poem.scope

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** poem  
**Book page(s):** 23

### Arabic

وهاك خلف علماء العدد ... في الآي منظوما على المعتمد
سميته الفرائد الحسانا ... أرجو به القبول والإحسانا

### English

Here, then, are the differences among the verse-counting authorities, set out in verse according to the relied-upon view. I have named it al-Fara'id al-Hisan, hoping thereby for acceptance and divine favor.

## nfb.intro.commentary.scope

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** commentary  
**Book page(s):** 23

### Arabic

وأقول: هاك اسم فعل أمر بمعنى خذ، والخلف بمعنى الاختلاف، والآية في اللغة العلامة، وفي الاصطلاح طائفة من القرآن الكريم ذات مبدأ ومقطع علمت بالتوقيف من الشارع، وجعلت دلالة وعلامة على انقطاع الكلام، وعلى صدق المخبر بها، والفرائد جمع فريدة، وهى الجوهرة النفيسة. والحسان جمع حسناء والمعنى: خذ أيها الطالب المختلف فيه بين العلماء الذين بحثوا في عدد آي القرآن الكريم حال كون هذا المختلف فيه منظوما ليسهل عليك حفظه وضبطه، وحال كونه ثابتا على القول الذى اعتمده العلماء وآثروه بالقبول. وقد سميت هذا المنظوم "الفرائد الحسان" تشبيها له في اتساقه وانتظامه وعظم قيمته بالجواهر الحسان وأنا أرجو بسبب هذا النظم القبول من الله ﵎ لعملي، والإحسان إلي في الدنيا والآخرة لأني خدمت به ناحية من القرآن الكريم وهى بيان المواضع التي وقع خلاف العلماء في عدها آية وعدم عدها، وهي ناحية هامة لها فوائد جليلة ستقف عليها قريبا إن شاء الله تعالى. وقد اقتفيت في هذا النظم أثر الإمامين الجليلين أبي عمرو الداني في كتابه "البيان" والشاطبي في "ناظمة الزهر" وجعلت هذين الكتابين عمدتي ومرجعي فيما يتعلق بجميع أئمة العدد، ما عدا العدد الحمصي فإنهما لم يتعرضا له فجعلت عمدتي في بيانه "تحقيق البيان" ونظمه لخاتمة المحققين الشيخ محمد المتولي و"إتحاف فضلاء البشر" للأستاذ الفاضل الشيخ البنا، و"لطائف الإشارات" للعلامة القسطلاني: وقبل الشروع في المقصود

### English

Hak is an imperative particle meaning 'take.' Khalaf means difference or disagreement. In Arabic usage, ayah means a sign; in technical usage it means a section of the Noble Qur'an with a beginning and an end, established by authoritative transmission from the Lawgiver, and made an indication and sign of the cessation of discourse and of the truth of what is thereby conveyed. Fara'id is the plural of faridah, meaning a precious jewel, and hisan is the plural of hasna', meaning something beautiful. The sense of the verse is: Take, O student, what is disputed among the scholars who investigated the counting of the verses of the Noble Qur'an, presented in verse so that it may be easy for you to memorize and master, and presented according to the position the scholars adopted and received with acceptance. I named this poem al-Fara'id al-Hisan because, in its ordered arrangement and great value, it resembles beautiful jewels. By means of this poem I hope for acceptance from God for my work and for His favor toward me in this world and the next, since through it I have served one aspect of the Noble Qur'an: namely, identifying the places where scholars differed over whether a given place is to be counted as a verse or not. This is an important subject and it carries major benefits, which you will encounter shortly, God willing. In this poem I followed the lead of the two great imams, Abu 'Amr al-Dani in his book al-Bayan and al-Shatibi in Nazimat al-Zahr, and I made these two works my foundation and reference regarding all the verse-counting authorities, except for the Himsi count, which they did not discuss. For that I relied on Tahqiq al-Bayan and its versification by Shaykh Muhammad al-Mutawalli, on Ithaf Fudala' al-Bashar by the eminent Shaykh al-Banna, and on Lata'if al-Isharat by al-Qastallani. Before entering the main subject, however...

## nfb.madkhal.fasilah.definition

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** technical_note  
**Book page(s):** 24

### Arabic

يحسن بنا أن نبين معنى الفاصلة، والطرق التى تعرف بها، وفوائد معرفتها ونذكر علماء العدد موجزين القول في ذلك فنقول:
الفاصلة: هى آخر كلمة في الآية نحو: العالمين، نستعين، مآب، بصيرا، أحد، وهى مرادفة لرأس الآية.

### English

It is fitting, before proceeding, that we explain the meaning of fasilah, the ways by which it is recognized, the benefits of knowing it, and the verse-counting authorities, while keeping the discussion brief.

A fasilah is the final word in a verse, such as al-'alamin, nasta'in, ma'ab, basiran, and ahad. It is synonymous with ra's al-ayah, the verse ending or verse head.

## nfb.madkhal.fasilah.methods

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** technical_note  
**Book page(s):** 24

### Arabic

طرق معرفة الفواصل: هى أربعة: الأولى مساواة الآية لما قبلها وما بعدها طولا وقصرا.
الثانية: مشاكلة الفاصلة لغيرها مما هو معها في السورة في الحرف الأخير منها أو فيما قبله.
الثالثة: الاتفاق على عد نظائرها في القرآن الكريم. الرابعة: انقطاع الكلام عندها.

### English

The ways of identifying fawasil are four: first, the verse matches what comes before and after it in length or brevity. Second, its ending resembles other endings within the same surah in the final letter or in the letter before it. Third, there is agreement that analogous cases elsewhere in the Qur'an are counted. Fourth, the discourse comes to a stop at that point.

## nfb.madkhal.fasilah.benefits.1-4

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** technical_note  
**Book page(s):** 24

### Arabic

فوائد معرفة الفواصل: لمعرفتها فوائد جليلة وفيما يلى أهمها:
الأولى: يحتاج لمعرفة الفواصل لصحة الصلاة. فقد قال الفقهاء فيمن لم يحفظ الفاتحة يأتى بدلها بسبع آيات. فمن لم يكن عالما بالفواصل لا يمكنه أن يأتى بما يصحح صلاته.
الثانية: يحتاج إليها للحصول على الأجر الموعود به على قراءة عدد معين من الآيات في الصلاة.
الثالثة: كون هذه المعرفة سببا لنيل الأجر الموعود به على تعلم عدد مخصوص من الآيات أو قراءته عند النوم مثلا.
الرابعة: الاحتياج إلى هذا الفن في معرفة ما يسن قراءته بعد الفاتحة في الصلاة فقد نصوا على أنه لا تحصل السنة إلا بقراءة ثلاث آيات قصار.

### English

Knowing the fawasil has major benefits. Among the most important are the following: First, it is needed for the validity of prayer. The jurists said that one who has not memorized al-Fatihah must recite seven verses in its place. Whoever does not know the verse-endings cannot recite what would make the prayer valid. Second, it is needed in order to obtain the promised reward attached to reciting a specified number of verses in prayer. Third, this knowledge is a means of attaining the promised reward attached to learning, or for example reciting before sleep, a specified number of verses. Fourth, this discipline is needed in order to know what is recommended to recite after al-Fatihah in prayer, for the scholars stated that the sunnah is not fulfilled except by reciting three short verses...

## nfb.madkhal.fasilah.benefits.5-7

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** technical_note  
**Book page(s):** 25

### Arabic

أو آية طويلة. ومن يرى منهم وجوب القراءة بعد الفاتحة لا يكتفي بأقل من هذا العدد.
الخامسة: اعتباره لصحة الخطبة فقد أوجبوا فيها قراءة آية تامة.
السادسة: توقف معرفة الوقف المسنون على هذا العلم. فالوقف على رءوس الآي سنة. وإذا لم يكن القارئ على خبرة بهذا الفن لا يتأتى له معرفه الوقف المسنون، وتمييزه من غيره.
السابعة: اعتبار هذا الفن في باب الإمالة؛ فإن من القراء من يوجب إمالة رءوس آي سور خاصة كرءوس آي السور الآتية: طه، والنجم، الأعلى، الشمس، الضحى، العلق، فإن ورشا وأبا عمرو يقللان رءوس آي هذه السور قولا واحدا، فلو لم يعلم القارئ رءوس الآي عند المدني الأول والبصري لا يستطيع معرفة ما يقلل لورش باتفاق، وما يقلل بالخلاف، وكذا يقال بالنسبة لأبي عمرو.

### English

...or one long verse. Those who hold that recitation after al-Fatihah is obligatory do not accept less than this number. Fifth, this knowledge matters for the validity of the khutbah, since they required that a complete verse be recited in it. Sixth, knowledge of the recommended stopping places depends on this science, because stopping at the ends of verses is sunnah. If the reciter is not acquainted with this discipline, he cannot know the recommended stop or distinguish it from other kinds of stopping. Seventh, this discipline matters in the chapter of imalah. Some reciters require imalah at the ends of the verses of particular surahs, such as Ta Ha, al-Najm, al-A'la, al-Shams, al-Duha, and al-'Alaq. Warsh and Abu 'Amr perform taqlil at the verse endings of these surahs without exception. If the reciter does not know the verse endings according to the First Madinan and the Basran systems, he cannot know what Warsh performs taqlil on by agreement and what he does so on by disagreement; the same applies to Abu 'Amr.

## nfb.madkhal.enumerators.list

**Section (Arabic):** مدخل  
**Section (English):** Introduction  
**Kind:** technical_note  
**Book page(s):** 25

### Arabic

علماء العدد: هم سبعة على المشهور: المدني الأول، المدني الأخير، المكي، البصري، الدمشقي، الحمصي، الكوفي. وسنأتي على بيانهم واحدا واحدا إن شاء الله تعالى.

### English

The verse-counting authorities are, according to the well-known view, seven: the First Madinan, the Last Madinan, the Makkan, the Basran, the Dimashqi, the Himsi, and the Kufan. We will now identify them one by one, God willing.

## nfb.madkhal.enumerators.madani_first

**Section (Arabic):** المدني الأول  
**Section (English):** The First Madinan Count  
**Kind:** technical_note  
**Book page(s):** 25, 26

### Arabic

المدني الأولى: هو ما يرويه نافع عن شيخيه أبي جعفر -يزيد بن القعقاع- وشيبة بن نصاح، وهذا هو ما يرويه أهل الكوفة عن أهل المدينة بدون تعيين أحد منهم، بمعنى أنه متى روى الكوفيون العدد عن أهل المدينة بدون تسمية أحد منهم فهو عدد المدني الأول وهو المروي عن نافع عن شيخيه أبي جعفر وشيبة. وروى أهل البصرة عدد المدني الأول عن ورش عن نافع عن شيخيه، والحاصل أن المدني الأول هو ما رواه نافع عن شيخيه لكن اختلف أهل الكوفة والبصرة في روايته عن المدنيين. فأما أهل الكوفة فرووه عن أهل المدينة بدون تعيين أحد منهم. ورواه أهل البصرة عن ورش عن نافع عن شيخيه، وعدد آي القرآن في رواية الكوفيين عن أهل المدينة ٦٢١٧. وفي رواية أهل البصرة عن ورش ٦٢١٤. والذى اعتمده الإمام الشاطبي رواية أهل الكوفة، وقد تبع في ذلك الإمام الداني.

### English

The First Madinan count is what Nafi' transmits from his two shaykhs, Abu Ja'far—Yazid ibn al-Qa'qa'—and Shaybah ibn Nissah. This is also what the people of Kufa transmit from the people of Madinah without specifying any one of them. In other words, whenever the Kufans transmit a verse-count from the people of Madinah without naming a particular authority, that is the First Madinan count, namely the count transmitted by Nafi' from his two shaykhs Abu Ja'far and Shaybah. The people of Basrah transmitted the First Madinan count through Warsh from Nafi' from his two shaykhs. In sum, the First Madinan count is what Nafi' transmitted from his two shaykhs, but the people of Kufa and Basrah differed in the route by which they related it from the Madinans. The Kufans narrated it from the people of Madinah without naming a specific transmitter, whereas the Basrans narrated it through Warsh from Nafi' from his two shaykhs. The total number of Qur'anic verses in the Kufan transmission from the people of Madinah is 6217; in the Basran transmission through Warsh it is 6214. The transmission adopted by Imam al-Shatibi is the Kufan one, and in that he followed Imam al-Dani.

## nfb.madkhal.enumerators.madani_last

**Section (Arabic):** المدني الأخير  
**Section (English):** The Last Madinan Count  
**Kind:** technical_note  
**Book page(s):** 26

### Arabic

المدني الأخير: هو ما يرويه إسماعيل بن جعفر عن يزيد وشيبة بواسطة نقله عن سليمان بن جماز. فيكون المدني الأخير هو المروي عن إسماعيل بن جعفر عن سليمان بن جماز عن شيبة ويزيد، وعدد آي القرآن عنده ٦٢١٤.

### English

The Last Madinan count is what Isma'il ibn Ja'far transmits from Yazid and Shaybah by way of Sulayman ibn Jimmaz. So the Last Madinan count is that transmitted by Isma'il ibn Ja'far from Sulayman ibn Jimmaz from Shaybah and Yazid, and the total number of Qur'anic verses in it is 6214.

## nfb.madkhal.enumerators.makki

**Section (Arabic):** العدد المكي  
**Section (English):** The Makkan Count  
**Kind:** technical_note  
**Book page(s):** 26

### Arabic

العدد المكي: هو ما رواه الإمام الداني بسنده إلى عبد الله بن كثير القارئ عن مجاهد بن جبير عن ابن عباس عن أبي بن كعب عن رسول الله -ﷺ. وعدد الآي عنده ٦٢١٠.

### English

The Makkan count is what Imam al-Dani transmitted with his chain to 'Abd Allah ibn Kathir the reciter, from Mujahid ibn Jubayr, from Ibn 'Abbas, from Ubayy ibn Ka'b, from the Messenger of God—peace and blessings be upon him. The total number of verses in this count is 6210.

## nfb.madkhal.enumerators.basri

**Section (Arabic):** العدد البصري  
**Section (English):** The Basran Count  
**Kind:** technical_note  
**Book page(s):** 26

### Arabic

العدد البصري: هو ما يرويه عطاء بن يسار وعاصم الجحدري. وهو ما ينسب بعد إلى أيوب بن المتوكل. وعدد آي القرآن عنده ٦٢٠٤.

### English

The Basran count is what 'Ata' ibn Yasar and 'Asim al-Jahdari transmit. It is later attributed to Ayyub ibn al-Mutawakkil. The total number of Qur'anic verses in this count is 6204.

## nfb.madkhal.enumerators.dimashqi

**Section (Arabic):** العدد الدمشقي  
**Section (English):** The Dimashqi Count  
**Kind:** technical_note  
**Book page(s):** 26

### Arabic

العدد الدمشقي: هو ما رواه يحيى الذماري عن عبد الله بن عامر، اليحصبي عن أبي الدرداء وينسب هذا العدد إلى عثمان بن عفان -﵁- وعدد الآي فيه ٦٢٢٧ وقيل: ٦٢٢٦.

### English

The Dimashqi count is what Yahya al-Dhimari transmitted from 'Abd Allah ibn 'Amir al-Yahsubi, from Abu al-Darda'. This count is also attributed to 'Uthman ibn 'Affan, and its total number of verses is 6227; it is also said to be 6226.

## nfb.madkhal.enumerators.himsi

**Section (Arabic):** العدد الحمصي  
**Section (English):** The Himsi Count  
**Kind:** technical_note  
**Book page(s):** 26

### Arabic

العدد الحمصي: هو ما أضيف إلى شريح بن يزيد الحمصي الحضرمي وعدد الآي فيه ٦٢٣٢.

### English

The Himsi count is the one attributed to Shurayh ibn Yazid al-Himsi al-Hadrami, and its total number of verses is 6232.

## nfb.madkhal.enumerators.kufi

**Section (Arabic):** العدد الكوفي  
**Section (English):** The Kufan Count  
**Kind:** technical_note  
**Book page(s):** 26, 27

### Arabic

العدد الكوفي: هو ما يرويه حمزة وسفيان عن علي بن أبي طالب -رضى الله عنه- بواسطة ذوي علم وخبرة، وهذا العدد هو الذي اشتهر بالعدد الكوفي فيكون لأهل الكوفة عددان أحدهما مروي عن أهل المدينة. وهو المدني الأول السابق ذكره، وثانيهما ما يرويه حمزة وسفيان كما تقدم، والحاصل أن ما يروى عن أهل الكوفة موقوفا على أهل المدينة فهو المدني الأول، وما يروى عنهم موصولا إلى علي بن أبي طالب فهو المنسوب إليهم وعدد آي القرآن فيه ٦٢٣٦.

### English

The Kufan count is what Hamzah and Sufyan transmit from 'Ali ibn Abi Talib—may God be pleased with him—through authorities possessed of knowledge and expertise. This is the count that became famous as the Kufan count. Thus the people of Kufa have two counts: one transmitted from the people of Madinah, namely the First Madinan count mentioned earlier, and a second one transmitted by Hamzah and Sufyan as just described. In summary, whatever is narrated from the Kufans but stops with the people of Madinah is the First Madinan count, while whatever is narrated from them with a connected route back to 'Ali ibn Abi Talib is the count attributed to them. The total number of Qur'anic verses in it is 6236.

## nfb.madkhal.labels.shorthand

**Section (Arabic):** إطلاقات الناظم  
**Section (English):** The Author's Shorthand Labels  
**Kind:** technical_note  
**Book page(s):** 27

### Arabic

واعلم أننى إذا أطلقت في النظم لفظ المدني بأن قلت: إن موضع كذا يعده المدني ولم أقيده بكونه الأول أو الثاني فالمراد به ما يشمل المدنيين الأول والثاني وإذا قلت: "الحجازي" فالمراد به ما يشمل المدنيين والمكي، وإذا أطلقت لفظ "الشامي" فالمراد به الدمشقي والحمصي معا، وإذا قلت: "العراقي" فالمراد به البصري والكوفي، وإذا ذكرت أن فلانا يعد موضع كذا فيكون المراد أن غيره لا يعده. وإذا قلت: إن فلانا يسقط موضع كذا كان المراد أن غيره يعده والله أعلم.

### English

Know that when I use, in the poem, the label Madani and say that a certain place is counted by the Madani without qualifying it as First or Last, I mean both the First and Last Madinan counts together. When I say Hijazi, I mean the two Madinan counts together with the Makkan. When I use the label Shami, I mean both the Dimashqi and the Himsi together. When I say Iraqi, I mean the Basran and the Kufan together. If I state that a certain authority counts a given place, the intent is that the others do not count it. And if I say that a certain authority omits a given place, the intent is that the others do count it. God knows best.

## nfb.fatiha.poem

**Section (Arabic):** سورة الفاتحة  
**Section (English):** Surat al-Fatihah  
**Kind:** poem  
**Book page(s):** 27

### Arabic

والكوف مع مك يعد البسمله ... سواهما أولى عليهم عد له

### English

The Kufan, together with the Makkan, counts the basmalah; all others instead count the first 'alayhim.

## nfb.fatiha.commentary

**Section (Arabic):** سورة الفاتحة  
**Section (English):** Surat al-Fatihah  
**Kind:** commentary  
**Book page(s):** 27

### Arabic

وأقول: بينت في هذا البيت أن الخلاف وقع في موضعين من هذه السورة: البسملة وكلمة عليهم الأولى، وأن الكوفي والمكي -وحدهما- يعدان البسملة، فتكون متروكة لغيرهما من باقي علماء العدد. وهم المدنيان والبصري والشامي، وأن سواهما أي سوى الكوفي والمكي يعد كلمة عليهم الأولى من قوله تعالى: ﴿أَنْعَمْتَ عَلَيْهِم﴾ فتكون متروكة لهما. وقيدت كلمة عليهم بالأولى احترازا من الثانية وهي ﴿غَيْرِ الْمَغْضُوبِ﴾ فإنها متروكة لجميع علماء العدد. والخلاصة أن من يعد البسملة -وهما الكوفي والمكي- لا يعدان "عليهم"، ومن يعد "عليهم" وهم باقي علماء العدد لا يعدون البسملة. والله أعلم.

### English

In this line I explained that the disagreement in this surah concerns two places: the basmalah and the first occurrence of the word 'alayhim. The Kufan and the Makkan—and they alone—count the basmalah, so it is omitted by the remaining verse-counting authorities, namely the two Madinan counts, the Basran, and the Shami. Everyone other than the Kufan and the Makkan counts the first 'alayhim, in the phrase {an'amta 'alayhim}; it is therefore omitted by those two. I qualified the word 'alayhim as 'the first' in order to exclude the second occurrence—namely {ghayri al-maghdubi 'alayhim}—for that one is omitted by all the verse-counting authorities. The upshot is that those who count the basmalah, namely the Kufan and the Makkan, do not count 'alayhim; and those who count 'alayhim, namely the remaining authorities, do not count the basmalah. God knows best.

## nfb.baqarah.title

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** title  
**Book page(s):** 28

### Arabic

سورة البقرة:

### English

Surat al-Baqarah.

## nfb.baqarah.poem.openings

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 28

### Arabic

ما بدؤه حرف التهجي الكوف عد ... لا الوتر مع طس مع ذي الرا اعتمد
وأولا الشورى لحمصي يعد ... موافقا للكوف فيما قد ورد

### English

The Kufan counts as a verse any surah-opening that begins with the letters of tahajji—except the single-letter openings, Ta Sin, and those coupled with ra'. The Himsi also counts the two openings of al-Shura, agreeing with the Kufan in what has been transmitted.

## nfb.baqarah.commentary.openings

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 28, 29

### Arabic

وأقول: ذكرت في البيت الأول أن السورة التي افتتحت بحرف التهجي يعد الكوفي الحرف الذي افتتحت به تلك السورة آية مستقلة، وذلك قوله تعالى: ﴿الم﴾ أول البقرة، وآل عمران، والعنكبوت، والروم، ولقمان، والسجدة، و﴿المص﴾ أول الأعراف، و﴿كهيعص﴾ أول مريم، و﴿طه﴾ أول سورتها، و﴿طسم﴾ أول الشعراء، والقصص، و﴿يس﴾ أول سورتها، و﴿حم﴾ أول سورة غافر، وفصلت، والشورى، والزخرف، والدخان، والجاثية، والأحقاف، وأيضا ﴿عسق﴾ أول سورة الشورى، فالكوفي يعد كل فاتحة من هذه الفواتح آية مستقلة. ويعد ﴿حم﴾ أول الشورى آية وكذلك ﴿عسق﴾ فهما آيتان عنده، وقولي: «لا الوتر» الخ استثناء من القاعدة السابقة.
والمراد بالوتر ما كان على حرف واحد، وذلك في ثلاث سور ﴿ص﴾ و﴿ق﴾ و﴿ن﴾، فالكوفي لا يعد شيئا من ذلك رأس آية، وكذلك لا يعد ﴿طس﴾ أول سورة النمل آية. ومعنى قولي: مع ذي الرا، بالمد — وقصر للوزن — أن الكوفي لا يعد أيضا حروف التهجي التي افتتح بها بعض السور إذا كانت مقترنة براء، وذلك ﴿الر﴾ أول سورة يونس، وهود، ويوسف، وإبراهيم، والحجر، و﴿المر﴾ أول سورة الرعد، فليس شيء من ذلك آية عند الكوفي ولا عند غيره. ثم ذكرت في البيت الثاني أن الآيتين أول سورة الشورى وهما ﴿حم﴾ و﴿عسق﴾ تعدان للحمصي، فهو يوافق الكوفي في عد هاتين الآيتين فقط دون غيرهما من فواتح السور التي عرفت فيما سبق أن الكوفي ينفرد بعدها.
والله تعالى أعلم.

### English

In the first line I stated that when a surah opens with the letters of tahajji, the Kufan counts the opening letters of that surah as an independent verse. This includes {alif lam mim} at the beginning of al-Baqarah, Al 'Imran, al-'Ankabut, al-Rum, Luqman, and al-Sajdah; {alif lam mim sad} at the beginning of al-A'raf; {kaf ha ya 'ayn sad} at the beginning of Maryam; {ta ha} at the beginning of its surah; {ta sin mim} at the beginning of al-Shu'ara' and al-Qasas; {ya sin} at the beginning of its surah; {ha mim} at the beginning of Ghafir, Fussilat, al-Shura, al-Zukhruf, al-Dukhan, al-Jathiyah, and al-Ahqaf; and also {ayn sin qaf} at the beginning of al-Shura. The Kufan thus counts each of these openings as an independent verse. He counts {ha mim} at the beginning of al-Shura as a verse, and likewise {ayn sin qaf}; so for him they are two verses. My words 'not the single-letter openings...' are an exception to that earlier rule.

What is meant by al-watr is what consists of a single letter, and that occurs in three surahs: {sad}, {qaf}, and {nun}. The Kufan does not count any of these as a verse, nor does he count {ta sin} at the beginning of Surat al-Naml as a verse. By my words 'those coupled with ra''—with the long form, though shortened in recitation for the meter—I mean that the Kufan also does not count the opening letters of those surahs whose initials are joined with ra': {alif lam ra'} at the beginning of Yunus, Hud, Yusuf, Ibrahim, and al-Hijr, and {alif lam mim ra'} at the beginning of al-Ra'd. None of that is a verse for the Kufan or for anyone else. I then mentioned in the second line that the two opening verses of Surat al-Shura—namely {ha mim} and {ayn sin qaf}—are counted by the Himsi. In this matter alone he agrees with the Kufan, and not in the other surah-openings in which, as previously noted, the Kufan stands alone.

God knows best.

## nfb.baqarah.poem.alim_muslihun

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 29

### Arabic

وعد شامي أليم أولا ... سواه مصلحون عنه نقلا

### English

The Shami counts the first alim; all others instead, as transmitted, count muslihun in its place.

## nfb.baqarah.commentary.alim_muslihun

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 29

### Arabic

وأقول: أخبرت أن الشامي يعد لفظ أليم، والمراد به قوله تعالى: ﴿وَلَهُمْ عَذَابٌ أَلِيم﴾ الذي بعده ﴿بِمَا كَانُوا يَكْذِبُون﴾، وقيدت لفظ أليم بالأول احترازا عن غيره من باقي المواضع المذكورة في السورة مثل ﴿وَلِلْكَافِرِينَ عَذَابٌ أَلِيمٌ﴾ و﴿وَلا يُزَكِّيهِمْ وَلَهُمْ عَذَابٌ أَلِيمٌ﴾ فهي معدودة اتفاقا. وقولي: «سواه مصلحون» إلخ معناه أن غير الشامي من علماء العدد يعد ﴿مُصْلِحُونَ﴾ من قوله تعالى: ﴿قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ﴾. والحاصل أن الشامي ينفرد بعد أليم المتقدم ولا يعد ﴿مُصْلِحُونَ﴾، وأن غيره من باقي علماء العدد يترك عد ﴿أَلِيم﴾ ويعد ﴿مُصْلِحُونَ﴾.

### English

I stated that the Shami counts the word {alim}, by which I mean the phrase {walahum 'adhabun alim}, followed by {bima kanu yukadhibun}. I qualified {alim} as 'the first' in order to exclude the other occurrences mentioned in the surah, such as {walil-kafirina 'adhabun alim} and {wa la yuzakkihim wa lahum 'adhabun alim}, for those are counted by agreement. My words 'all others instead count muslihun' mean that every authority other than the Shami counts {muslihun} in the phrase {qalu innama nahnu muslihun}. The result is that the Shami alone counts after the earlier {alim} and does not count {muslihun}; all the other verse-counting authorities omit {alim} and count {muslihun}.

## nfb.baqarah.poem.khaifin_albab_khalaq

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 29

### Arabic

وخائفين عد للبصري ... وثاني الألباب للشامي
كالثان والعراق ثم ثاني ... خلاق اتركنه للثاني

### English

Count kha'ifin for the Basran, and the second uli al-albab for the Shami—likewise for the Last Madinan and the Iraqi. Then leave the second khalaq for the Last Madinan.

## nfb.baqarah.commentary.khaifin_albab_khalaq

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 29, 30

### Arabic

وأقول: أمرت بعد خائفين من قوله تعالى: ﴿مَا كَانَ لَهُمْ أَنْ يَدْخُلُوهَا إِلَّا خَائِفِينَ﴾ للبصري، فيكون غير معدود لغيره. وبعد لفظ الألباب في ثاني مواضعه، وهو قوله تعالى: ﴿وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ﴾، للشامي، والمدني الثاني، والعراق أي البصري والكوفي، فيكون متروكا للمدني الأول والمكي. واحترزت بالثاني عن الأول وهو قوله تعالى: ﴿وَلَكُمْ فِي الْقِصَاصِ حَيَاةٌ يَا أُولِي الْأَلْبَابِ﴾ فليس معدودا لأحد. ثم أمرت بترك عد لفظ خلاق في ثاني مواضعه، وهو قوله تعالى: ﴿فَمِنَ النَّاسِ مَنْ يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا وَمَا لَهُ فِي الْآخِرَةِ مِنْ خَلاقٍ﴾، للمدني الثاني، فيكون معدودا لغيره. واحترزت بالموضع الثاني عن الموضع الأول وهو قوله تعالى: ﴿وَلَقَدْ عَلِمُوا لَمَنِ اشْتَرَاهُ مَا لَهُ فِي الْآخِرَةِ مِنْ خَلاقٍ﴾ فإنه متروك إجماعا.

### English

I directed that counting should fall after {kha'ifin} in the phrase {ma kana lahum an yadkhuluha illa kha'ifin} for the Basran, so it is not counted by anyone else. I also directed that counting should fall after {uli al-albab} in its second occurrence, namely {wattaquni ya uli al-albab}, for the Shami, the Last Madinan, and the Iraqi—that is, the Basran and the Kufan. It is therefore omitted by the First Madinan and the Makkan. I qualified it as 'the second' in order to exclude the first occurrence, namely {wa lakum fi al-qisasi hayatun ya uli al-albab}, for that is not counted by anyone.

I then directed that the word {khalaq} be left uncounted in its second occurrence, namely {fa-min al-nasi man yaqulu rabbana atina fi al-dunya wa ma lahu fi al-akhirati min khalaq}, for the Last Madinan; accordingly it is counted by the others. I qualified it as the second occurrence in order to exclude the first, namely {wa la-qad 'alimu la-man ishtarahu ma lahu fi al-akhirati min khalaq}, for that one is omitted by consensus.

## nfb.baqarah.poem.yunfiqun

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 30

### Arabic

وينفقون الثان عد المكي ... وأول أيضا بدون شك

### English

Count the second yunfiqun for the Makkan, and for the First Madinan as well, without doubt.

## nfb.baqarah.commentary.yunfiqun

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 30

### Arabic

وأقول: قوله تعالى: ﴿يُنْفِقُون﴾ في الموضع الثاني، وهو ﴿وَيَسْأَلونَكَ مَاذَا يُنْفِقُونَ﴾ الذي بعده ﴿قُلِ الْعَفْو﴾، يعده المكي والمدني الأول ويتركه غيرهما. واحترزت بالثاني عن الأول وهو ﴿يَسْأَلونَكَ مَاذَا يُنْفِقُونَ قُلْ مَا أَنْفَقْتُمْ﴾ فهو متروك للجميع.

### English

What is meant is the second occurrence of {yunfiqun}, namely {wa yas'alunaka madha yunfiqun}, followed by {qul al-'afw}. The Makkan and the First Madinan count it, while the others leave it. I qualified it as 'the second' in order to exclude the first occurrence, namely {yas'alunaka madha yunfiquna qul ma anfaqtum}, for that one is omitted by all.

## nfb.baqarah.poem.tatafakkarun

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 30

### Arabic

وتتفكرون في الأولى ورد ... للثان والشامي وكوف في العدد

### English

The first tatafakkarun is transmitted as counted by the Last Madinan, the Shami, and the Kufan.

## nfb.baqarah.commentary.tatafakkarun

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 30

### Arabic

وأقول: كلمة ﴿تَتَفَكَّرُون﴾ في أول مواضعها، وذلك قوله تعالى: ﴿لَعَلَّكُمْ تَتَفَكَّرُون﴾ الذي بعده في الدنيا والآخرة، قد ورد انتظامها في سلك العدد للمدني الثاني، والشامي، والكوفي، فتكون غير معدودة للمدني الأول والمكي والبصري. وقيدتها بالأولى احترازا عن الثانية التي بعدها ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا أَنْفِقُوا مِنْ طَيِّبَاتِ مَا كَسَبْتُمْ﴾ الآية، فإنها معدودة إجماعا.

### English

The word {tatafakkarun} in its first occurrence—namely {la'allakum tatafakkarun}, followed by {fi al-dunya wa al-akhirah}—is reported as included in the verse-count for the Last Madinan, the Shami, and the Kufan. It is therefore not counted by the First Madinan, the Makkan, or the Basran. I qualified it as 'the first' in order to exclude the second occurrence that comes later, in the verse beginning {ya ayyuha alladhina amanu anfaqu min tayyibati ma kasabtum}; that second occurrence is counted by consensus.

## nfb.baqarah.poem.marufa_qayyum

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 31

### Arabic

معروفا البصري ومعه قد ولي ... ثان لدى القيوم مع مك جلي

### English

The Basran counts qawlan ma'rufa; and with him the Last Madinan, together with the Makkan, clearly counts al-hayy al-qayyum as well.

## nfb.baqarah.commentary.marufa_qayyum

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 31

### Arabic

وأقول: أفاد هذا البيت أن قوله تعالى: ﴿إِلَّا أَنْ تَقُولُوا قَوْلًا مَعْرُوفًا﴾ معدود للبصري ومتروك لغيره، وأن المدني الثاني والمكي قد تبعا البصري واصطحبا معه في عد قوله تعالى: ﴿اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوم﴾. وإذا كان هذا الموضع معدودا للمدني الثاني والمكي والبصري يكون متروكا للمدني الأول والشامي والكوفي.

### English

This line indicates that the phrase {illa an taqulu qawlan ma'rufa} is counted by the Basran and omitted by the others. It also shows that the Last Madinan and the Makkan follow the Basran in counting {allahu la ilaha illa huwa al-hayy al-qayyum}. Since this place is counted by the Last Madinan, the Makkan, and the Basran, it is omitted by the First Madinan, the Shami, and the Kufan.

## nfb.baqarah.poem.ila_alnur_shahid

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** poem  
**Book page(s):** 31

### Arabic

عد إلى النور المديني الأول ... وخلف مك في شهيد يهمل

### English

The First Madinan counts ila al-nur; and the reported Makkan disagreement over shahid is to be disregarded.

## nfb.baqarah.commentary.ila_alnur_shahid

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** commentary  
**Book page(s):** 31

### Arabic

وأقول: عد المدني الأول قوله تعالى: ﴿اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُمْ مِنَ الظُّلُمَاتِ إِلَى النُّورِ﴾ وتركه غيره. ومعنى قولي: وخلف مك إلخ أنه اختلف عن المكي في عد وترك قوله تعالى: ﴿تَبَايَعْتُمْ وَلَا يُضَارَّ كَاتِبٌ وَلَا شَهِيدٌ﴾، وأن هذا الخلاف غير معتد به؛ إذ الصحيح أن آية الدين آية واحدة عند جميع علماء العدد كما تدل على ذلك الأحاديث والآثار. فما نقل عن المكي أنه كان يعد ﴿وَلَا شَهِيدٌ﴾ لا يحفل به، ولا يلتفت إليه.

### English

The First Madinan counts the phrase {allahu waliyyu alladhina amanu yukhrijuhum min al-zulumati ila al-nur}, while the others leave it. As for my words concerning the Makkan disagreement, the meaning is that a disagreement is reported from the Makkan on whether to count or omit {wa la shahid} in the phrase {tabaya'tum wa la yudarra katibun wa la shahid}. This disagreement is not relied upon, for the correct position is that the Verse of Debt is a single verse according to all the verse-counting authorities, as indicated by the hadiths and transmitted reports. Accordingly, what has been related from the Makkan count—that it treated {wa la shahid} as a verse ending—is not to be heeded or given any consideration.

## nfb.baqarah.completion

**Section (Arabic):** سورة البقرة  
**Section (English):** Surat al-Baqarah  
**Kind:** completion  
**Book page(s):** 31

### Arabic

تتمة: مما تقدم يعلم أن مواضع الخلاف في هذه السورة أحد عشر موضعا: ﴿الم﴾ و﴿وَلَهُمْ عَذَابٌ أَلِيمٌ﴾ و﴿مُصْلِحُونَ﴾ و﴿خَائِفِينَ﴾ و﴿وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ﴾ و﴿مِنْ خَلَاقٍ﴾ الثاني و﴿يُنْفِقُونَ﴾ الثاني و﴿تَتَفَكَّرُونَ﴾ الأول و﴿قَوْلًا مَعْرُوفًا﴾ و﴿الْحَيُّ الْقَيُّومُ﴾ و﴿إِلَى النُّورِ﴾. وقد علمت من عد ومن ترك في كل موضع منها، والله تعالى أعلم.

### English

Completion note: from what has preceded, it is known that the disputed places in this surah are eleven: {alif lam mim}; {walahum 'adhabun alim}; {muslihun}; {kha'ifin}; {wattaquni ya uli al-albab}; the second {min khalaq}; the second {yunfiqun}; the first {tatafakkarun}; {qawlan ma'rufa}; {al-hayy al-qayyum}; and {ila al-nur}. You have now learned who counts and who omits each of these places. God knows best.

## nfb.al_imran.title

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** title  
**Book page(s):** 32

### Arabic

سورة آل عمران:

### English

Surat Al 'Imran.

## nfb.al_imran.poem.injil_furqan_israil

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** poem  
**Book page(s):** 32

### Arabic

وغير شام أول الإنجيل عد ... والثان للكوفي به قد انفرد
وغيره الفرقان إسرائيلا ... للبصر والحمصي عند الأولى

### English

Everyone but the Shami counts the first occurrence of al-injil; in the second occurrence the Kufan alone stands apart. Everyone but him counts al-furqan; and the first Isra'ila is counted by the Basran and the Himsi.

## nfb.al_imran.commentary.injil_furqan_israil

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** commentary  
**Book page(s):** 32

### Arabic

وأقول: أفاد البيت الأول أن غير الشامي من علماء العدد عد لفظ الإنجيل في الموضع الأول، وأعني به قوله تعالى: ﴿وَأَنْزَلَ التَّوْرَاةَ وَالْإِنْجِيلَ﴾ أول السورة، فالشامي لا يعده، والتقييد بالأول لإخراج الموضع الثاني. وقد ذكرته بقولي: "والثان للكوفي به قد انفرد" أي أن الكوفي قد انفرد بعد لفظ الإنجيل في الموضع الثاني، وهو قوله تعالى: ﴿وَيُعَلِّمُهُ الْكِتَابَ وَالْحِكْمَةَ وَالتَّوْرَاةَ وَالْإِنْجِيلَ﴾، فيكون هذا الموضع متروكًا لغير الكوفي من أهل العدد.
وقولي: "وغيره الفرقان" الضمير فيه يعود على الكوفي، والمعنى أن غير الكوفي يعد قوله تعالى: ﴿وَأَنْزَلَ الْفُرْقَانَ﴾، فيكون غير معدود للكوفي. ثم بينت أن كلمة "إسرائيل" الأولى تعد للحمصي والبصري ولا تعد لغيرهما، والمراد بها قوله تعالى: ﴿وَرَسُولًا إِلَى بَنِي إِسْرَائِيلَ﴾، والتقييد بالأولى لإخراج غيرها من المواضع المتروكة إجماعًا، وهما موضعان في آية ﴿كُلُّ الطَّعَامِ كَانَ حِلًّا لِبَنِي إِسْرَائِيلَ إِلَّا مَا حَرَّمَ إِسْرَائِيلُ﴾.

### English

In the first line I indicated that everyone other than the Shami among the verse-counting authorities counts the word {al-injil} in its first occurrence, by which I mean His statement {wa anzala al-tawrata wa al-injil} at the beginning of the surah; the Shami does not count it. The qualification 'first' excludes the second occurrence. I referred to that by my words 'and in the second the Kufan alone stands apart,' meaning that the Kufan alone counts after the word {al-injil} in the second occurrence, namely His statement {wa yu'allimuhu al-kitab wa al-hikmah wa al-tawrata wa al-injil}. This place is therefore omitted by the other verse-counting authorities.

By my words 'everyone but him counts al-furqan,' the pronoun refers back to the Kufan. The meaning is that everyone other than the Kufan counts His statement {wa anzala al-furqan}; it is therefore uncounted for the Kufan. I then explained that the first occurrence of the word {Isra'ila} is counted by the Himsi and the Basran, and not by anyone else. What is meant is His statement {wa rasulan ila bani Isra'ila}. The qualification 'first' excludes the other occurrences, which are unanimously left uncounted. These are the two occurrences in the verse {kullu al-ta'ami kana hillan li-bani Isra'ila illa ma harrama Isra'ilu}.

## nfb.al_imran.poem.mimma_tuhibbun

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** poem  
**Book page(s):** 32

### Arabic

مما تحبون لمك أثبت ... وللدمشقي كذا مع شيبة

### English

Affirm mimma tuhibbun for the Makkan; likewise for the Dimashqi, together with Shaybah.

## nfb.al_imran.commentary.mimma_tuhibbun

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** commentary  
**Book page(s):** 32, 33

### Arabic

وأقول: أمر الناظم -عفا الله عنه- بإثبات عد قوله تعالى: ﴿حَتَّى تُنْفِقُوا مِمَّا تُحِبُّونَ﴾ للمكي والدمشقي وشيبة بن نصاح من أهل المدينة. فيكون غير معدود للبصري والكوفي والحمصي وأبي جعفر من أهل المدينة. وتقييد هذا الموضع بكلمة ﴿مِمَّا﴾ لإخراج الموضعين الآخرين في السورة، وهما ﴿قُلْ إِنْ كُنْتُمْ تُحِبُّونَ اللَّهَ﴾ و﴿مِنْ بَعْدِ مَا أَرَاكُمْ مَا تُحِبُّونَ﴾، فإنهما متروكان بالاتفاق.

### English

The author—may God pardon him—directed that the counting of His statement {hatta tunfiqu mimma tuhibbun} be affirmed for the Makkan, the Dimashqi, and Shaybah ibn Nissah from among the people of Madinah. It is therefore not counted by the Basran, the Kufan, the Himsi, or Abu Ja'far from among the people of Madinah. The qualification of this place by the word {mimma} excludes the other two occurrences in the surah, namely {qul in kuntum tuhibbuna Allah} and {min ba'di ma arakum ma tuhibbun}, for both are omitted by agreement.

## nfb.al_imran.poem.maqam_ibrahim

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** poem  
**Book page(s):** 33

### Arabic

مقام إبراهيم للشامي ورد ... كذا أبو جعفر أيضا في العدد

### English

The counting of maqam Ibrahim is transmitted for the Shami; likewise for Abu Ja'far in the count.

## nfb.al_imran.commentary.maqam_ibrahim

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** commentary  
**Book page(s):** 33

### Arabic

وأقول: قوله تعالى: ﴿فِيهِ آيَاتٌ بَيِّنَاتٌ مَقَامُ إِبْرَاهِيمَ﴾ ورد عده للشامي وأبي جعفر، فيكون متروكًا للباقين.

### English

His statement {fihi ayatun bayyinatun maqamu Ibrahim} is transmitted as counted by the Shami and Abu Ja'far, and is therefore omitted by the rest.

## nfb.al_imran.completion

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** completion  
**Book page(s):** 33

### Arabic

تتمة: أماكن الخلاف في هذه السورة سبعة: ﴿الم﴾ و﴿وَأَنْزَلَ التَّوْرَاةَ وَالْإِنْجِيلَ﴾ و﴿أَنْزَلَ الْفُرْقَانَ﴾ و﴿وَالْحِكْمَةَ وَالتَّوْرَاةَ وَالْإِنْجِيلَ﴾ و﴿وَرَسُولًا إِلَى بَنِي إِسْرَائِيلَ﴾ و﴿حَتَّى تُنْفِقُوا مِمَّا تُحِبُّونَ﴾ و﴿مَقَامُ إِبْرَاهِيمَ﴾. ولا يخفى عليك العادون والتاركون في كل موضع من هذه المواضع، والله أعلم.

### English

Completion note: the disputed places in this surah are seven: {alif lam mim}; {wa anzala al-tawrata wa al-injil}; {anzala al-furqan}; {wa al-hikmata wa al-tawrata wa al-injil}; {wa rasulan ila bani Isra'ila}; {hatta tunfiqu mimma tuhibbun}; and {maqamu Ibrahim}. It is already clear to you who counts and who omits each of these places. God knows best.

## nfb.al_imran.note.shaybah_abu_jafar

**Section (Arabic):** سورة آل عمران  
**Section (English):** Surat Al 'Imran  
**Kind:** technical_note  
**Book page(s):** 33

### Arabic

وهذا أول المواضع التي اختلف فيها شيبة وأبو جعفر، وهي ست وهذا أولها. والثاني: مقام إبراهيم، والثالث: وإن كانوا ليقولون في الصافات، والرابع: قد جاءنا نذير في الملك، والخامس: إلى طعامه في سورة عبس، والسادس: فأين تذهبون في التكوير. وقد عدها شيبة إلا الموضع الثاني فتركه، وترك عدها أبو جعفر إلا الموضع الثاني فعده.

### English

This is the first of the places in which Shaybah and Abu Ja'far differ. They are six in total, and this is the first of them. The second is {maqamu Ibrahim}; the third is {wa in kanu layaqulun} in al-Saffat; the fourth is {qad ja'ana nadhir} in al-Mulk; the fifth is {ila ta'amihi} in Surat 'Abasa; and the sixth is {fa-ayna tadhhabun} in al-Takwir. Shaybah counted all of them except the second, which he omitted; Abu Ja'far omitted all of them except the second, which he counted.

## nfb.nisa.title

**Section (Arabic):** سورة النساء  
**Section (English):** Surat al-Nisa'  
**Kind:** title  
**Book page(s):** 33

### Arabic

سورة النساء:

### English

Surat al-Nisa'.

## nfb.nisa.poem.sabil_alim

**Section (Arabic):** سورة النساء  
**Section (English):** Surat al-Nisa'  
**Kind:** poem  
**Book page(s):** 33

### Arabic

لكوف السبيل والشامي يعد ... وذا أليما آخرا به انفرد

### English

The Kufan counts al-sabil, and the Shami counts it as well; and with that final alim the latter alone stands apart.

## nfb.nisa.commentary.sabil_alim

**Section (Arabic):** سورة النساء  
**Section (English):** Surat al-Nisa'  
**Kind:** commentary  
**Book page(s):** 33

### Arabic

وأقول: المختلف في هذه السورة فاصلتان اثنتان فقط الأولى ﴿أَنْ تَضِلُّوا السَّبِيل﴾ والثانية ﴿فَيُعَذِّبُهُمْ عَذَابًا أَلِيمًا﴾ آخر السورة الذي بعده ﴿وَلا يَجِدُونَ لَهُمْ مِنْ دُونِ اللَّهِ وَلِيًّا وَلا نَصِيرًا﴾ وقد بينت أن الأولى تعد للكوفي والشامي وتترك لغيرهما، وأن الثانية انفرد الشامي بعدها: فاسم الإشارة في قولي "وذا" يعود على الشامي وقيدت ﴿أَلِيمًا﴾ بكونه آخر المواضع: احترازا عن غيره من المواضع المعدودة للجميع في السورة وجملتها ثلاثة: ﴿أُولَئِكَ أَعْتَدْنَا لَهُمْ عَذَابًا أَلِيمًا﴾ و﴿بَشِّرِ الْمُنَافِقِينَ بِأَنَّ لَهُمْ عَذَابًا أَلِيمًا﴾ و﴿وَأَعْتَدْنَا لِلْكَافِرِينَ مِنْهُمْ عَذَابًا أَلِيمًا﴾ والله أعلم.

### English

The disputed fawasil in this surah are only two. The first is {an tadillu al-sabil}; the second is {fayu'adhdhibahum 'adhaban alima} at the end of the surah, followed by {wa la yajiduna lahum min duni Allahi waliyyan wa la nasira}. I have indicated that the first is counted by the Kufan and the Shami and omitted by the others, and that in the second the Shami alone counts after it. Thus the demonstrative in my words 'and with that' refers back to the Shami. I qualified {alima} as the final occurrence in order to exclude the other occurrences in the surah that are counted by all, three in total: {ula'ika a'tadna lahum 'adhaban alima}; {bashshir al-munafiqina bi-anna lahum 'adhaban alima}; and {wa a'tadna lil-kafirina minhum 'adhaban alima}. God knows best.

## nfb.maidah.title

**Section (Arabic):** سورة المائدة  
**Section (English):** Surat al-Ma'idah  
**Kind:** title  
**Book page(s):** 34

### Arabic

سورة المائدة:

### English

Surat al-Ma'idah.

## nfb.maidah.poem.uqud_kathir_ghalibun

**Section (Arabic):** سورة المائدة  
**Section (English):** Surat al-Ma'idah  
**Kind:** poem  
**Book page(s):** 34

### Arabic

وبالعقود عن كثير أهملا ... كوف وغالبون بصر نقلا

### English

At al-'uqud and 'an kathir the Kufan omits the count; and as for ghalibun, the Basran alone counts it by transmitted report.

## nfb.maidah.commentary.uqud_kathir_ghalibun

**Section (Arabic):** سورة المائدة  
**Section (English):** Surat al-Ma'idah  
**Kind:** commentary  
**Book page(s):** 34

### Arabic

وأقول: ذكرت في هذا البيت المواضع المختلف فيها بين علماء العدد ثلاثة الأول ﴿أَوْفُوا بِالْعُقُود﴾ والثاني ﴿وَيَعْفُو عَنْ كَثِير﴾ والثالث: ﴿فَإِنَّكُمْ غَالِبُون﴾ وأن الكوفي قد أهمل عد الموضعين الأولين فيكونان معدودين لغيره. وأن البصري نقل عد الموضع الثالث فيكون متروكا لغيره من باقي علماء العدد والله أعلم.

### English

In this line I mentioned that the disputed places among the verse-counting authorities in this surah are three. The first is {awfu bi-al-'uqud}; the second is {wa ya'fu 'an kathir}; and the third is {fa-innakum ghalibun}. The Kufan has omitted counting the first two places, so they are counted by everyone else. The Basran alone is reported to count the third place, so it is omitted by the rest of the counting authorities. God knows best.

## nfb.anam_araf.title

**Section (Arabic):** سورة الأنعام والأعراف  
**Section (English):** Surat al-An'am and Surat al-A'raf  
**Kind:** title  
**Book page(s):** 34

### Arabic

سورة الأنعام والأعراف:

### English

Surat al-An'am and Surat al-A'raf.

## nfb.anam.poem.nur

**Section (Arabic):** سورة الأنعام  
**Section (English):** Surat al-An'am  
**Kind:** poem  
**Book page(s):** 34

### Arabic

قد عد والنور لدى مكيهم ... والمدني الأول والثاني وسم

### English

The Makkan counts al-nur, and so do the First and Last Madinans.

## nfb.anam.commentary.nur

**Section (Arabic):** سورة الأنعام  
**Section (English):** Surat al-An'am  
**Kind:** commentary  
**Book page(s):** 34

### Arabic

وأقول: المعنى أن قوله تعالى: ﴿وَجَعَلَ الظُّلُمَاتِ وَالنُّور﴾ معدود عند المكي والمدنيين الأول والثاني فلا يكون معدودا عند البصري والشامي والكوفي.

### English

The meaning is that His statement {wa ja'ala al-zulumati wa al-nur} is counted by the Makkan and the First and Last Madinans; accordingly, it is not counted by the Basran, the Shami, or the Kufan.

## nfb.anam.poem.biwakil_mustaqim_fayakun

**Section (Arabic):** سورة الأنعام  
**Section (English):** Surat al-An'am  
**Kind:** poem  
**Book page(s):** 34, 35

### Arabic

وبوكيل أولا كوف يرى ... وغيره في مستقيم آخرا
كفيكون

### English

The Kufan is held to count the first bi-wakil, while everyone else counts the final mustaqim—and likewise fayakun.

## nfb.anam.commentary.biwakil_mustaqim_fayakun

**Section (Arabic):** سورة الأنعام  
**Section (English):** Surat al-An'am  
**Kind:** commentary  
**Book page(s):** 35

### Arabic

وأقول: أخبرت في شطر البيت الأول أن الكوفي يرى عد "بوكيل" في أول المواضع وهو قوله تعالى: ﴿قُلْ لَسْتُ عَلَيْكُمْ بِوَكِيل﴾ ومفهوم هذا أن غير الكوفي يسقط هذا الموضع من العدد. وتقييدي له بأولا لإخراج الموضع الثاني وهو قوله تعالى: ﴿وَمَا أَنْتَ عَلَيْهِمْ بِوَكِيلٍ﴾ فإنه مجمع على عده، ثم ذكرت في الشطر الثاني أن غير الكوفي يرى عد لفظ مستقيم آخر المواضع وأعني به قوله تعالى آخر السورة: ﴿قُلْ إِنَّنِي هَدَانِي رَبِّي إِلَى صِرَاطٍ مُسْتَقِيمٍ﴾ وقولي: "كفيكون" معناه أن غير الكوفي أيضا يعد "فيكون" في قوله تعالى: ﴿وَيَوْمَ يَقُولُ كُنْ فَيَكُون﴾ كما يعد مستقيم السابق الذكر. وعلم من هذا أن الكوفي يترك عد هذين الموضعين. وتقييد مستقيم بالآخر للاحتراز عن الموضعين السابقين في السورة وهما ﴿وَمَنْ يَشَأْ يَجْعَلْهُ عَلَى صِرَاطٍ مُسْتَقِيمٍ﴾ و﴿وَهَدَيْنَاهُمْ إِلَى صِرَاطٍ مُسْتَقِيمٍ﴾ فإنه متفق على عدهما.

### English

In the first hemistich of the line, I stated that the Kufan considers bi-wakil to be counted in its first occurrence, namely His statement {qul lastu 'alaykum bi-wakil}. The implication is that everyone other than the Kufan drops this place from the count. My qualifying it as 'the first' excludes the second occurrence, namely His statement {wa ma anta 'alayhim bi-wakil}, for that is unanimously counted. Then, in the second hemistich, I mentioned that everyone other than the Kufan counts the word mustaqim in its final occurrence, by which I mean His statement at the end of the surah: {qul innani hadani rabbi ila siratin mustaqim}. My words 'and likewise fayakun' mean that everyone other than the Kufan also counts {fayakun} in His statement {wa yawma yaqulu kun fayakun}, just as they count the previously mentioned {mustaqim}. From this it is known that the Kufan leaves these two places uncounted. My qualifying {mustaqim} as the final occurrence is meant to exclude the two earlier occurrences in the surah—{wa man yasha' yaj'alhu 'ala siratin mustaqim} and {wa hadaynahum ila siratin mustaqim}—for both are unanimously counted.

## nfb.anam_araf.poem.fayakun_din_taudun

**Section (Arabic):** سورة الأنعام والأعراف  
**Section (English):** Surat al-An'am and Surat al-A'raf  
**Kind:** poem  
**Book page(s):** 35

### Arabic

كفيكون الدين شام بصري ... ثم تعودون لكوف يجري

### English

And likewise fayakun; as for al-din, the Shami and the Basran count it, and ta'udun is counted by the Kufan.

## nfb.araf.commentary.din_taudun

**Section (Arabic):** سورة الأعراف  
**Section (English):** Surat al-A'raf  
**Kind:** commentary  
**Book page(s):** 35

### Arabic

وقولي: "الدين شام بصري الخ" بيان للفواصل المختلف فيها في سورة الأعراف وجملتها أربعة ذكرت الموضع الأول منها بقولي: الدين شام بصري. أي أن قوله تعالى: ﴿وَادْعُوهُ مُخْلِصِينَ لَهُ الدِّينَ﴾ معدود للشامي والبصري ومتروك لغيرهما ثم ذكرت الموضع الثاني بقولي: ثم تعودون إلخ، أي أن قوله تعالى: ﴿كَمَا بَدَأَكُمْ تَعُودُون﴾ يجري عده للكوفي ولا يجري لغيره.

### English

My words 'al-din Shami Basri...' and what follows are an explanation of the disputed fawasil in Surat al-A'raf, which in this discussion number four. I mentioned the first of them by saying 'al-din Shami Basri,' meaning that His statement {wa ad'uhu mukhlisina lahu al-din} is counted by the Shami and the Basran and left uncounted by the others. I then mentioned the second by saying 'then ta'udun...' meaning that His statement {kama bada'akum ta'udun} is counted for the Kufan and not counted for anyone else.

## nfb.araf.poem.nar_israil

**Section (Arabic):** سورة الأعراف  
**Section (English):** Surat al-A'raf  
**Kind:** poem  
**Book page(s):** 35

### Arabic

واعدد من النار وإسرائيل في ... ثالثها عن الحجازي اقتفي

### English

Count min al-nar; and with Isra'il, follow the Hijazi in its third occurrence.

## nfb.araf.commentary.nar_israil

**Section (Arabic):** سورة الأعراف  
**Section (English):** Surat al-A'raf  
**Kind:** commentary  
**Book page(s):** 35, 36

### Arabic

وأقول هذا بيان للموضعين الباقيين في سورة الأعراف فأمرت بعد قوله تعالى:
﴿فَآتِهِمْ عَذَابًا ضِعْفًا مِنَ النَّارِ﴾ وقوله تعالى: ﴿وَتَمَّتْ كَلِمَتُ رَبِّكَ الْحُسْنَى عَلَى بَنِي إِسْرائيلَ﴾ وهو ثالث مواضع إسرائيل للحجازي ولا يعزب عن ذهنك أن المراد به المدنيان والمكي واحترزت بقولي في ثلثها أي ثلث مواضع إسرائيل عن الموضع الأول والثاني المتفق على عدهما والموضع الأول ﴿فَأَرْسِلْ مَعِيَ بَنِي إِسْرائيلَ﴾ والثاني ﴿وَلَنُرْسِلَنَّ مَعَكَ بَنِي إِسْرائيلَ﴾.

### English

This is an explanation of the two remaining places in Surat al-A'raf. Thus I directed that one count after His statement {fa atihim 'adhaban di'fan min al-nar}, and after His statement {wa tammat kalimatu rabbika al-husna 'ala bani Isra'il}; this latter is the third of the occurrences of Isra'il for the Hijazi. It should not escape your notice that what is meant here by the Hijazi is the two Madinans together with the Makkan. My words 'in its third [occurrence]' are intended to exclude the first and second occurrences of Isra'il, which are unanimously counted. The first is {fa arsil ma'i bani Isra'il}; the second is {wa lanursilanna ma'aka bani Isra'il}.

## nfb.anam_araf.completion

**Section (Arabic):** سورة الأنعام والأعراف  
**Section (English):** Surat al-An'am and Surat al-A'raf  
**Kind:** completion  
**Book page(s):** 36

### Arabic

الحاصل أن المواضع المختلف فيها في سورة الأنعام أربعة ﴿وَالنُّور﴾ و﴿بِوَكِيل﴾ و﴿فَيَكُون﴾ و﴿مُسْتَقِيم﴾ والمواضع المختلف فيها في الأعراف خمسة ﴿الْمُص﴾ و﴿لَهُ الدِّين﴾ و﴿تَعُودُون﴾ و﴿عَلَى بَنِي إِسْرائيل﴾ و﴿مِنَ النَّار﴾ ولا يغيب عنك العادون والتاركون لجميع ما ذكر.

### English

To sum up: the disputed places in Surat al-An'am are four: {wa al-nur}, {bi-wakil}, {fayakun}, and {mustaqim}. The disputed places in Surat al-A'raf are five: {alif lam mim sad}; {lahu al-din}; {ta'udun}; {'ala bani Isra'il}; and {min al-nar}. The authorities who count and omit each of these should now be clear to you.

## nfb.anfal_tawbah.title

**Section (Arabic):** سورة الأنفال والتوبة  
**Section (English):** Surat al-Anfal and Surat al-Tawbah  
**Kind:** title  
**Book page(s):** 36

### Arabic

سورة الأنفال والتوبة:

### English

Surat al-Anfal and Surat al-Tawbah.

## nfb.anfal.poem.yughlabun_mafulan_1

**Section (Arabic):** سورة الأنفال  
**Section (English):** Surat al-Anfal  
**Kind:** poem  
**Book page(s):** 36

### Arabic

في يغلبون الشام كالبصري اتبع ... أول مفعولا عن الكوفي دع

### English

In yughlabun, follow the Shami together with the Basran; as for the first maf'ulan, omit it for the Kufan.

## nfb.anfal.commentary.yughlabun_mafulan_1

**Section (Arabic):** سورة الأنفال  
**Section (English):** Surat al-Anfal  
**Kind:** commentary  
**Book page(s):** 36

### Arabic

وأقول: أخبرت أن الشامي والبصري اتبعا العد في يغلبون في قوله تعالى: ﴿ثُمَّ يُغْلَبُون﴾ فغير الشامي والبصري لا يتبعان العد في هذا الموضع ثم أمرت بترك عد مفعولا في الموضع الأول عن الكوفي وأعني به قوله تعالى: ﴿وَلَكِنْ لِيَقْضِيَ اللَّهُ أَمْرًا كَانَ مَفْعُولًا﴾ الذي بعده ليهلك من هلك عن بينة فيكون معدودا لغيره وقيدت مفعولا بالأول احترازا عن الثاني الذي بعده وإلى الله ترجع الأمور فلم يعده أحد.

### English

I stated that the Shami and the Basran follow the count in yughlabun, in His statement {thumma yughlabun}; accordingly, everyone other than the Shami and the Basran does not count this place. Then I directed that one leave aside the counting of maf'ulan in its first occurrence for the Kufan, by which I mean His statement {walakin li-yaqdiya Allahu amran kana maf'ulan}, the one followed by {liyahlika man halaka 'an bayyinah}; accordingly, it is counted by everyone other than him. I qualified maf'ulan as 'the first' in order to exclude the second occurrence, the one after {wa ila Allahi turja'u al-umur}, for no one counts it.

## nfb.anfal_tawbah.poem.bilmuminin_mushrikin_thani

**Section (Arabic):** سورة الأنفال والتوبة  
**Section (English):** Surat al-Anfal and Surat al-Tawbah  
**Kind:** poem  
**Book page(s):** 36

### Arabic

بالمؤمنين لكل لا البصري عد ... والمشركين الثان للبصري ورد

### English

{bi-al-mu'minin} is counted by all, save the Basran; and the second al-mushrikin is reported for the Basran.

## nfb.anfal.commentary.bilmuminin

**Section (Arabic):** سورة الأنفال  
**Section (English):** Surat al-Anfal  
**Kind:** commentary  
**Book page(s):** 36, 37

### Arabic

وأقول: أعني أن قوله تعالى: ﴿هُوَ الَّذِي أَيَّدَكَ بِنَصْرِهِ وَبِالْمُؤْمِنِينَ﴾ عده كل علماء العدد إلا البصري فلم يعده.

### English

What I mean is that His statement {huwa alladhi ayyadaka bi-nasrihi wa bi-al-mu'minin} is counted by all the verse-counting authorities except the Basran, for he does not count it.

## nfb.tawbah.commentary.mushrikin_thani

**Section (Arabic):** سورة التوبة  
**Section (English):** Surat al-Tawbah  
**Kind:** commentary  
**Book page(s):** 37

### Arabic

وقوله تعالى: ﴿أَنَّ اللَّهَ بَرِيءٌ مِنَ الْمُشْرِكِينَ﴾ وهو ثاني مواضع لفظ المشركين قد ورد عده للبصري وتركه لغيره. وقيدت لفظ المشركين بالموضع الثاني للاحتراز عن الأول المعدود بالإجماع وهو ﴿إِلَى الَّذِينَ عَاهَدْتُمْ مِنَ الْمُشْرِكِينَ﴾ والثالث المتروك بالإجماع وهو ﴿إِلَّا الَّذِينَ عَاهَدْتُمْ مِنَ الْمُشْرِكِينَ﴾. وأما ما ورد في هذه السورة من لفظ المشركين وهو كثير فيها فلا يتوهم أن شيئا منه آية ولهذا جعلنا هذا القيد وهو لفظ "الثان" احترازا عن الأول والثالث فقط والله أعلم.

### English

And His statement {anna Allaha bari'un min al-mushrikin}, which is the second occurrence of the word al-mushrikin, is transmitted as counted for the Basran and omitted by everyone else. I qualified the word al-mushrikin as being in its second occurrence in order to exclude the first one, which is unanimously counted, namely {ila alladhina 'ahadtum min al-mushrikin}, and the third one, which is unanimously omitted, namely {illa alladhina 'ahadtum min al-mushrikin}. As for the other occurrences of the word al-mushrikin in this surah, and they are many, one should not imagine that any of them is a verse ending. For that reason I made this qualifier—the word 'second'—as an exclusion applying only to the first and third. God knows best.

## nfb.tawbah.poem.qayyim_aliman_thamud

**Section (Arabic):** سورة التوبة  
**Section (English):** Surat al-Tawbah  
**Kind:** poem  
**Book page(s):** 37

### Arabic

والقيم الحمصي عدا نقله ... وللدمشقي أليما أوله
ثمود عند المدني الأول ... عد كذا للثان والمكي انقل

### English

The Himsi has transmitted the counting of al-qayyim; and for the Dimashqi, count the first aliman. Count Thamud for the First Madinan; likewise report it for the Last and the Makkan.

## nfb.tawbah.commentary.qayyim_aliman_thamud

**Section (Arabic):** سورة التوبة  
**Section (English):** Surat al-Tawbah  
**Kind:** commentary  
**Book page(s):** 37

### Arabic

وأقول: قوله تعالى: ﴿ذَلِكَ الدِّينُ الْقَيِّم﴾ قد نقله الحمصي في ضمن عدد آي القرآن الكريم ولم ينقله غيره وقوله تعالى: ﴿إِلاّ تَنْفِرُوا يُعَذِّبْكُمْ عَذَابًا أَلِيمًا﴾ معدود للدمشقي ومتروك لغيره. وقيدت أليما بالأول حيث قلت أوله احترازا عن الموضع الثاني وهو ﴿وَإِنْ يَتَوَلَّوْا يُعَذِّبْهُمُ اللَّهُ عَذَابًا أَلِيمًا﴾ فلا خلاف في تركه لجميع أهل العد. ثم ذكرت أن قوله تعالى: ﴿وَعَادٍ وَثَمُود﴾ معدود عند المدني الأول والثاني والمكي وهم الحجازيون فيكون متروكا عند البصري والشامي والكوفي.

### English

His statement {dhalika al-din al-qayyim} has been transmitted by the Himsi within his verse count of the Noble Qur'an, and no one else has transmitted it. His statement {illa tanfiru yu'adhdhibkum 'adhaban aliman} is counted by the Dimashqi and omitted by everyone else. I qualified aliman as the first occurrence, when I said 'its first,' in order to exclude the second occurrence, namely {wa in tatawallaw yu'adhdhibhumu Allahu 'adhaban aliman}; there is no disagreement that all the counting authorities omit it. Then I mentioned that His statement {wa 'Adin wa Thamuda} is counted by the First Madinan, the Last Madinan, and the Makkan—namely, the Hijazis—and is therefore omitted by the Basran, the Shami, and the Kufan.

## nfb.anfal_tawbah.completion

**Section (Arabic):** سورة الأنفال والتوبة  
**Section (English):** Surat al-Anfal and Surat al-Tawbah  
**Kind:** completion  
**Book page(s):** 37

### Arabic

"تتمة" المواضع المختلف فيها في سورة الأنفال ثلاثة: ﴿ثُمَّ يُغْلَبُون﴾ و﴿كَانَ مَفْعُولًا﴾ في الموضع الأول و﴿بِالْمُؤْمِنِين﴾ والمختلف فيها في سورة التوبة أربعة: ﴿بَرِيءٌ مِنَ الْمُشْرِكِين﴾ و﴿ذَلِكَ الدِّينُ الْقَيِّم﴾ و﴿عَذَابًا أَلِيمًا﴾ و﴿عَادٍ وَثَمُود﴾ ولا يخفى من عد ومن ترك في كل منها، والله أعلم.

### English

Completion: the disputed places in Surat al-Anfal are three: {thumma yughlabun}, {kana maf'ulan} in its first occurrence, and {bi-al-mu'minin}. The disputed places in Surat al-Tawbah are four: {bari'un min al-mushrikin}, {dhalika al-din al-qayyim}, {'adhaban aliman}, and {wa 'Adin wa Thamuda}. In each of them, it is already clear who counts and who omits. God knows best.

## nfb.yunus.title

**Section (Arabic):** سورة يونس  
**Section (English):** Surat Yunus  
**Kind:** title  
**Book page(s):** 38

### Arabic

سورة يونس:

### English

Surat Yunus.

## nfb.yunus.poem.din_sudur_shakirin

**Section (Arabic):** سورة يونس  
**Section (English):** Surat Yunus  
**Kind:** poem  
**Book page(s):** 38

### Arabic

والشام لفظ الدين والصدور عد ... والشاكرين لسواه يعتمد

### English

The Shami counts al-din and al-sudur; for everyone else, the relied-upon place is al-shakirin.

## nfb.yunus.commentary.din_sudur_shakirin

**Section (Arabic):** سورة يونس  
**Section (English):** Surat Yunus  
**Kind:** commentary  
**Book page(s):** 38

### Arabic

وأقول: اشتمل هذا البيت على بيان الفواصل المختلف فيها في هذه السورة فدل على أنها ثلاثة: ﴿مُخْلِصِينَ لَهُ الدِّين﴾ و﴿وَشِفَاءٌ لِمَا فِي الصُّدُور﴾ و﴿لَنَكُونَنَّ مِنَ الشَّاكِرِين﴾ وأفاد أن الشامي انفرد بعد الأوليين وأن الأخيرة قد اعتمد عدها لغيره. فمن عدد الأوليين وهو الشامي لا يعد الأخيرة ومن عد الأخيرة وهم غير الشامي يتركون عد الأوليين. ولا يخفى عليك أن ﴿الر﴾ ليست معدودة لأحد وكذا ﴿الر﴾ أول هود ويوسف وإبراهيم والحجر، وأيضا ﴿المر﴾ أول سورة الرعد لما سبق أول سورة البقرة فتنبه.

### English

This line sets out the disputed fawasil in this surah, showing that they are three: {mukhlisina lahu al-din}, {wa shifa'un lima fi al-sudur}, and {lanakunanna mina al-shakirin}. It indicates that the Shami alone counts the first two, and that the counting of the last is adopted for everyone besides him. Thus, whoever counts the first two—namely the Shami—does not count the last one; and whoever counts the last—namely everyone other than the Shami—leaves the first two uncounted. It should not escape you that {alif lam ra'} is not counted by anyone; likewise the {alif lam ra'} at the beginning of Hud, Yusuf, Ibrahim, and al-Hijr, and also {alif lam mim ra'} at the beginning of Surat al-Ra'd, as explained earlier at the beginning of Surat al-Baqarah. So take note.

## nfb.hud.title

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** title  
**Book page(s):** 38

### Arabic

سورة هود:

### English

Surat Hud.

## nfb.hud.poem.tushrikun_lut_2

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** poem  
**Book page(s):** 38

### Arabic

للكوف والحمصي تشركون عد ... ثاني لوط عنه كالبصري رد

### English

For the Kufan and the Himsi, count tushrikun; as for the second [occurrence of] Lut, omit it for the Himsi together with the Basran.

## nfb.hud.commentary.tushrikun_lut_2

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** commentary  
**Book page(s):** 38

### Arabic

وأقول: أمرت في هذا البيت بعد تشركون من قوله تعالى: ﴿وَاشْهَدُوا أَنِّي بَرِيءٌ مِمَّا تُشْرِكُونَ﴾ للكوفي والحمصي فتكون متروكة لغيرهما ثم أمرت برد لوط الثاني أي بعدم عده عن الحمصي والبصري فيكون معدودا لغيرهما، فالضمير في قولي: "عنه" يعود على الحمصي. والمراد بلوط الثاني قوله تعالى: ﴿يُجَادِلُنَا فِي قَوْمِ لُوط﴾ وخرج بقيد الثاني الموضع الأول وهو قوله تعالى: ﴿إِنَّا أُرْسِلْنَا إِلَى قَوْمِ لُوطٍ﴾ فمتفق على عده.

### English

In this line I directed that one count after tushrikun from His statement {washhadu anni bari'un mimma tushrikun} for the Kufan and the Himsi, so it is omitted by the others. Then I directed that the second occurrence of Lut be rejected—that is, not counted—for the Himsi and the Basran, and thus counted by the others. The pronoun in my words 'from him' refers back to the Himsi. What is meant by the second Lut is His statement {yujadiluna fi qawmi Lut}. Excluded by my qualification 'the second' is the first occurrence, namely His statement {inna ursilna ila qawmi Lutin}, for that one is unanimously counted.

## nfb.hud.poem.sijjil_mandud

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** poem  
**Book page(s):** 39

### Arabic

سجيل المكي مع الثاني انتمى ... وعد منضود لدى سواهما

### English

Sijjil is ascribed to the Makkan together with the Last Madinan; as for mandud, its counting belongs to the others.

## nfb.hud.commentary.sijjil_mandud

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** commentary  
**Book page(s):** 39

### Arabic

وأقول: تضمن هذا البيت بيان الخلاف في موضعين من مواضع الخلاف في هذه السورة. فأفاد أن "سجيل" من قوله تعالى: ﴿وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِنْ سِجِّيلٍ﴾ معدود للمكي مع المدني الثاني. ومتروك لغيرهما. ومعنى انتمى انتسب أي انتسب عد هذا اللفظ للمكي والمدني الثاني. ثم أفاد أيضا أن "منضود" من قوله تعالى: ﴿مِنْ سِجِّيلٍ مَنْضُودٍ﴾ معدود عند غير المكي والمدني والثاني فيكون متروكا عندهما. وقولي: "عد" يحتمل أن يكون فعلا ماضيا، وأن يكون فعل أمر.

### English

This line contains the disagreement over two of the disputed places in this surah. It indicates that {sijjil} in His statement {wa amtarna 'alayha hijaratan min sijjil} is counted by the Makkan together with the Last Madinan, and omitted by the others. The meaning of intama is 'it was ascribed'—that is, the counting of this word was ascribed to the Makkan and the Last Madinan. It also indicates that {mandud} in His statement {min sijjilin mandud} is counted by everyone other than the Makkan and the Last Madinan, and is thus omitted by those two. My word 'count' here may be understood either as a past-tense verb or as an imperative.

## nfb.hud.poem.muminin_mukhtalifin_amilun

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** poem  
**Book page(s):** 39

### Arabic

ومؤمنين الحمص مع حجازهم ... مختلفين اعدده عن شاميهم
كذا العراقي وعاملونا ... هم مع الأول ناقلونا

### English

Mu'minin is counted by the Himsi together with the Hijazis; and as for mukhtalifin, count it for the Shami, likewise for the Iraqi. As for 'amilun, those same ones have transmitted it, together with the First Madinan.

## nfb.hud.commentary.muminin_mukhtalifin_amilun

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** commentary  
**Book page(s):** 39

### Arabic

وأقول: أخبرت أن قوله تعالى: ﴿بَقِيَّتُ اللَّهِ خَيْرٌ لَكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ﴾ معدود للحمصي مع الحجازي أي المدنيين والمكي ومتروك لغيرهم ثم أمرت بعد قوله تعالى: ﴿وَلا يَزَالُونَ مُخْتَلِفِين﴾ عن الشامي والعراقي أي البصري والكوفي فلا يكون معدودا للحجازيين ثم أخبرت أن قوله تعالى: ﴿إِنَّا عَامِلُون﴾ قد نقل عده أيضا الشامي والعراقي، ويشاركهم في عده المدني الأول. فالضمير في قولي: "هم" يعود على المذكورين قبل وهم الشامي والعراقي. وإذا كان هؤلاء يعدونه فالباقي لا يعده وهما المكي والمدني الثاني والضمير في حجازهم، وشاميهم، يعود على علماء العدد. وإضافة الحجازي والشامي إليهم لأدنى ملابسة؛ لأن الحجازيين والشامي من ضمن علماء العدد.

### English

I stated that His statement {baqiyyatu Allahi khayrun lakum in kuntum mu'minin} is counted by the Himsi together with the Hijazi—that is, the two Madinans and the Makkan—and omitted by the others. Then I directed, after His statement {wa la yazaluna mukhtalifin}, that it be counted for the Shami and the Iraqi; here Iraqi means the Basran and the Kufan, so it is not counted by the Hijazis. Then I stated that His statement {inna 'amilun} has likewise been transmitted as counted by the Shami and the Iraqi, and the First Madinan shares with them in counting it. The pronoun in my words 'they' refers back to those mentioned immediately before—namely the Shami and the Iraqi. If these count it, then the remaining authorities do not count it, namely the Makkan and the Last Madinan. The pronouns in 'their Hijazi' and 'their Shami' refer back to the verse-counting authorities. The ascription of the Hijazi and the Shami to them is only for the slightest relation, since the Hijazis and the Shami are among the verse-counting authorities.

## nfb.hud.completion

**Section (Arabic):** سورة هود  
**Section (English):** Surat Hud  
**Kind:** completion  
**Book page(s):** 39

### Arabic

ومواضع الخلاف في هذه السورة سبعة: تشركون، لوط "الثاني"، سجيل، منضود، مؤمنين، مختلفين، عاملون.

### English

The disputed places in this surah are seven: tushrikun, the second Lut, sijjil, mandud, mu'minin, mukhtalifin, and 'amilun.

## nfb.rad.title

**Section (Arabic):** سورة الرعد  
**Section (English):** Surat al-Ra'd  
**Kind:** title  
**Book page(s):** 40

### Arabic

سورة الرعد:

### English

Surat al-Ra'd.

## nfb.rad.poem.jadid_nur_basir

**Section (Arabic):** سورة الرعد  
**Section (English):** Surat al-Ra'd  
**Kind:** poem  
**Book page(s):** 40

### Arabic

جديد النور سوى الكوفي عد
وللدمشقي البصير يعتمد

### English

Count jadid and al-nur for everyone but the Kufan; as for al-basir, its counting is adopted for the Dimashqi.

## nfb.rad.commentary.jadid_nur_basir

**Section (Arabic):** سورة الرعد  
**Section (English):** Surat al-Ra'd  
**Kind:** commentary  
**Book page(s):** 40

### Arabic

وأقول: المعنى: أن قوله تعالى: ﴿إِنَّا لَفِي خَلْقٍ جَدِيد﴾ وقوله تعالى: ﴿أَمْ هَلْ تَسْتَوِي الظُّلُمَاتُ وَالنُّورُ﴾ عدهما غير الكوفي وتركهما الكوفي، وقوله تعالى: ﴿هَلْ يَسْتَوِي الْأَعْمَى وَالْبَصِيرُ﴾ يعتمد عده للدمشقي دون سائر علماء العدد.

### English

The meaning is that His statement {inna lafi khalqin jadid} and His statement {am hal tastawi al-zulumatu wa al-nur} are both counted by everyone other than the Kufan, while the Kufan omits them both. As for His statement {hal yastawi al-a'ma wa al-basir}, its counting is adopted for the Dimashqi alone, apart from the rest of the verse-counting authorities.

## nfb.rad.poem.su_al_hisab_batil_min_kulli_bab

**Section (Arabic):** سورة الرعد  
**Section (English):** Surat al-Ra'd  
**Kind:** poem  
**Book page(s):** 40

### Arabic

سوء الحساب عد شام أولا ... وقبله الباطل للحمصي انجلا
من كل باب عده البصري ... وأيضا الشامي والكوفي

### English

Count the first su' al-hisab for the Shami; and before it, al-batil stands clear for the Himsi. Min kulli bab is counted by the Basran, and also by the Shami and the Kufan.

## nfb.rad.commentary.su_al_hisab_batil_min_kulli_bab

**Section (Arabic):** سورة الرعد  
**Section (English):** Surat al-Ra'd  
**Kind:** commentary  
**Book page(s):** 40

### Arabic

وأقول: قوله تعالى: ﴿أُولَئِكَ لَهُمْ سُوءُ الْحِسَاب﴾ وهو الموضع الأول عده الشامي وتركه غيره. وقيدته بالموضع الأول لإخراج الثاني المتفق على عده وهو ﴿وَيَخَافُونَ سُوءَ الْحِسَاب﴾ وقوله تعالى: ﴿كَذَلِكَ يَضْرِبُ اللَّهُ الْحَقَّ وَالْبَاطِلَ﴾ معدود للحمصي وحده. وقولي: "وقبله" ليس قيدا للاحتراز إنما هو لبيان الواقع وهو أن ﴿كَذَلِكَ يَضْرِبُ اللَّهُ الْحَقَّ وَالْبَاطِلَ﴾ وقع في التلاوة قبل: ﴿أُولَئِكَ لَهُمْ سُوءُ الْحِسَاب﴾ وقوله تعالى: ﴿وَالْمَلائِكَةُ يَدْخُلُونَ عَلَيْهِمْ مِنْ كُلِّ بَابٍ﴾ عده البصري والشامي والكوفي وتركه الحجازيون المدنيان والمكي.

### English

His statement {ula'ika lahum su' al-hisab}, which is the first occurrence, is counted by the Shami and omitted by the others. I qualified it as the first occurrence in order to exclude the second, which is unanimously counted, namely {wa yakhafuna su'a al-hisab}. His statement {kathalika yadribu Allahu al-haqqa wa al-batil} is counted by the Himsi alone. My words 'before it' are not a restrictive qualifier; they serve only to describe the actual sequence, namely that {kathalika yadribu Allahu al-haqqa wa al-batil} occurs earlier in the recitation than {ula'ika lahum su' al-hisab}. And His statement {wa al-mala'ikatu yadkhuluna 'alayhim min kulli bab} is counted by the Basran, the Shami, and the Kufan, and omitted by the Hijazis—the two Madinans and the Makkan.

## nfb.rad.completion

**Section (Arabic):** سورة الرعد  
**Section (English):** Surat al-Ra'd  
**Kind:** completion  
**Book page(s):** 40

### Arabic

والخلاصة أن مواضع الخلاف في هذه السورة ستة: جديد، والنور، والبصير، سوء الحساب، والباطل، من كل باب، وتأمل من عد ومن ترك والله أعلم.

### English

To sum up, the disputed places in this surah are six: jadid, al-nur, al-basir, su' al-hisab, al-batil, and min kulli bab. Reflect on who counts and who omits. God knows best.

## nfb.ibrahim.title

**Section (Arabic):** سورة إبراهيم  
**Section (English):** Surat Ibrahim  
**Kind:** title  
**Book page(s):** 41

### Arabic

سورة إبراهيم:

### English

Surat Ibrahim.

## nfb.ibrahim.poem.kila_al_nur_thamud

**Section (Arabic):** سورة إبراهيم  
**Section (English):** Surat Ibrahim  
**Kind:** poem  
**Book page(s):** 41

### Arabic

عن العراقي كلا النور امنعا ... ثمود بصر مع حجازي وعى

### English

For the Iraqi, omit both occurrences of {ila al-nur}; and take note that Thamud is counted by the Basran together with the Hijazis.

## nfb.ibrahim.commentary.kila_al_nur_thamud

**Section (Arabic):** سورة إبراهيم  
**Section (English):** Surat Ibrahim  
**Kind:** commentary  
**Book page(s):** 41

### Arabic

وأقول: اشتمل هذا البيت على أمرين: الأول الأمر بمنع عد لفظ النور في كلا موضعيه للعراق أي البصري والكوفي، فيكون معدودا للحجازيين والشامي، والموضع الأول قوله تعالى: ﴿لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ﴾. الأمر الثاني الإخبار بأن قوله تعالى: ﴿وَعَادٍ وَثَمُود﴾ يعده البصري مع الحجازي ويتركه الشامي والكوفي. وقولي: "وعى" معناه حفظ.

### English

This line contains two matters. The first is the instruction to omit the counting of the phrase {ila al-nur} in both of its occurrences for the Iraqi—that is, the Basran and the Kufan—so it is counted by the Hijazis and the Shami. The first occurrence is His statement {li-tukhrija al-nasa mina al-zulumati ila al-nur}. The second matter is the report that His statement {wa 'Adin wa Thamuda} is counted by the Basran together with the Hijazis and omitted by the Shami and the Kufan. My word wa'a means 'he retained' or 'took note'.

## nfb.ibrahim.poem.jadid_fi_al_sama_al_nahar_al_zalimun

**Section (Arabic):** سورة إبراهيم  
**Section (English):** Surat Ibrahim  
**Kind:** poem  
**Book page(s):** 41

### Arabic

جديد الكوفي وشام نقلا ... مع أول وفي السماء أولا
دع عنه والنهار غير البصري ... والظالمون عند شام يسري

### English

Jadid is transmitted for the Kufan and the Shami, together with the First; and as for the first {fi al-sama'}, omit it for him. Al-nahar is counted by everyone but the Basran, while al-zalimun holds good for the Shami.

## nfb.ibrahim.commentary.jadid_fi_al_sama_al_nahar_al_zalimun

**Section (Arabic):** سورة إبراهيم  
**Section (English):** Surat Ibrahim  
**Kind:** commentary  
**Book page(s):** 41

### Arabic

وأقول: بينت أن قوله تعالى: ﴿وَيَأْتِ بِخَلْقٍ جَدِيد﴾ نقل عده الكوفي والشامي والمدني الأول، فلم يعده المدني الأخير والمكي والبصري. ثم أمرت بترك عد لفظ ﴿فِي السَّمَاءِ﴾ في الموضع الأول منه عن المدني الأول، فيكون هذا الموضع معدودا لسائر علماء العدد دون المدني الأول. والموضع الأول هو ﴿وَفَرْعُهَا فِي السَّمَاءِ﴾، والتقييد لإخراج الموضع الثاني وهو ﴿فِي الْأَرْضِ وَلَا فِي السَّمَاءِ﴾ فإنه معدود للجميع. ثم أنبأت أن قوله تعالى: ﴿وَسَخَّرَ لَكُمُ اللَّيْلَ وَالنَّهَار﴾ عده غير البصري من الأئمة، وقوله تعالى: ﴿عَمَّا يَعْمَلُ الظَّالِمُون﴾ يسري عده عند الشامي دون غيره.

### English

I explained that His statement {wa ya'ti bi-khalqin jadid} is transmitted as counted by the Kufan, the Shami, and the First Madinan. It is therefore not counted by the Last Madinan, the Makkan, or the Basran. Then I directed that the phrase {fi al-sama'} in its first occurrence be omitted for the First Madinan; this place is therefore counted by the rest of the verse-counting authorities apart from the First Madinan. The first occurrence is {wa far'uha fi al-sama'}. The qualification as first excludes the second occurrence, namely {fi al-ardi wa la fi al-sama'}, for that one is counted by all. Then I stated that His statement {wa sakhkhara lakum al-layla wa al-nahar} is counted by everyone other than the Basran among the authorities, while His statement {'amma ya'malu al-zalimun} is counted by the Shami alone.

## nfb.ibrahim.completion

**Section (Arabic):** سورة إبراهيم  
**Section (English):** Surat Ibrahim  
**Kind:** completion  
**Book page(s):** 41

### Arabic

تكميل: مواضع الخلاف سبعة: إلى النور "في الموضعين"، وثمود، جديد، ﴿وَفَرْعُهَا فِي السَّمَاءِ﴾، والنهار، و"الظالمون" والله تعالى أعلم.

### English

Completion: the disputed places are seven: {ila al-nur} in its two occurrences, Thamud, jadid, {wa far'uha fi al-sama'}, al-nahar, and al-zalimun. God Most High knows best.

## nfb.isra_kahf.title

**Section (Arabic):** سورة الإسراء والكهف  
**Section (English):** Surat al-Isra' and Surat al-Kahf  
**Kind:** title  
**Book page(s):** 42

### Arabic

سورة الإسراء والكهف:

### English

Surat al-Isra' and Surat al-Kahf.

## nfb.isra_kahf.poem.sujjadan_huda_qalil_ghadan

**Section (Arabic):** سورة الإسراء والكهف  
**Section (English):** Surat al-Isra' and Surat al-Kahf  
**Kind:** poem  
**Book page(s):** 42

### Arabic

سجدا الكوفي هدى للشام دع ... قليل الثاني غدا له امتنع

### English

The Kufan counts sujjadan; leave huda aside for the Shami. Qalil belongs to the Last Madinan, while ghadan is barred for that same authority.

## nfb.isra_kahf.commentary.sujjadan_huda_qalil_ghadan

**Section (Arabic):** سورة الإسراء والكهف  
**Section (English):** Surat al-Isra' and Surat al-Kahf  
**Kind:** commentary  
**Book page(s):** 42

### Arabic

وأقول: اعلم أن في سورة الإسراء موضعا واحدا مختلفا فيه وهو قوله تعالى: ﴿يَخِرُّونَ لِلْأَذْقَانِ سُجَّدًا﴾ وقد انفرد الكوفي بعده وهذا معني قولي: "سجدا الكوفي" ثم أمرت بترك عد قوله تعالى -في سورة الكهف: ﴿وَزِدْنَاهُمْ هُدى﴾ للشامي فيكون معدودا للباقين، ومعنى قولي: قليل الثاني إلخ أن قوله تعالى: ﴿مَا يَعْلَمُهُمْ إِلَّا قَلِيل﴾ يعده المدني الثاني وحده وقوله تعالى: ﴿ذَلِكَ غَدًا﴾ امتنع عده للمدني الثاني فيعد لغيره، فالضمير في قوله: "له" يعود على المدني الثاني، والخلاصة أن من يعد "قليل" لا يعد "غدا" وبالعكس والله أعلم.

### English

Know that in Surat al-Isra' there is one disputed place only, namely His statement {yakhirruna lil-adhqani sujjadan}; the Kufan alone counts it, and that is the meaning of my words 'sujjadan—the Kufan.' Then I directed that the counting of His statement in Surat al-Kahf, {wa zidnahum huda}, be omitted for the Shami, so it is counted by the rest. The meaning of my words 'qalil [belongs to] the Second...' is that His statement {ma ya'lamuhum illa qalil} is counted by the Last Madinan alone, whereas His statement {dhalika ghadan} is barred from counting for the Last Madinan and is therefore counted by the others. The pronoun in my phrase 'for him' refers to the Last Madinan. The upshot is that whoever counts qalil does not count ghadan, and vice versa. God knows best.

## nfb.kahf.poem.zaran_abadan_sababan

**Section (Arabic):** سورة الكهف  
**Section (English):** Surat al-Kahf  
**Kind:** poem  
**Book page(s):** 42

### Arabic

زرعا نفى الأول مع مكيهم ... كأبدا بعد لثان شامهم
سببا الأولى كزرعا في العدد ... وعد باقيها العراقي اعتمد

### English

The First Madinan, together with the Makkan, omits zar'an; and the later abadan is likewise omitted for the Last Madinan and the Shami. The first sababan follows zar'an in the count, while the Iraqi adopts the counting of its remaining occurrences.

## nfb.kahf.commentary.zaran_abadan_sababan

**Section (Arabic):** سورة الكهف  
**Section (English):** Surat al-Kahf  
**Kind:** commentary  
**Book page(s):** 42, 43

### Arabic

وأقول: أعني أن قوله تعالى: ﴿وَجَعَلْنَا بَيْنَهُمَا زَرْعًا﴾ نفى عده المدني الأول والمكي وعده الباقون. ومعنى قولي: "كأبدا" إلخ أن قوله تعالى: ﴿أَنْ تَبِيدَ هَذِهِ أَبَدًا﴾ انتفى عده للمدني الثاني والشامي وعد للباقين. وقيدت "أبدا" بكونه واقعا في التلاوة بعد زرعا المذكور للاحتراز عن المواضع الأخرى المعدودة بالإجماع، مثل: ﴿مَاكِثِينَ فِيهِ أَبَدًا﴾ و﴿وَلَنْ تُفْلِحُوا إِذًا أَبَدًا﴾ و﴿فَلَنْ يَهْتَدُوا إِذًا أَبَدًا﴾. ومعنى قولي: "سببا الأولى" إلخ أن كلمة "سببا" الأولى في قوله تعالى: ﴿وَآتَيْنَاهُ مِنْ كُلِّ شَيْءٍ سَبَبًا﴾ حكمها حكم زرعا، يعدها من يعد زرعا، ويتركها من يتركها، فيتركها المدني الأول والمكي ويعدها الباقون، كما أن زرعا كذلك. واحترزت بالأولى عن باقي المواضع، وقد بينت حكمها بقولي: "وعد باقيها" إلخ أي أن العراقي -البصري والكوفي- اعتمد عد باقي مواضع سببا ولم يعتمد عدها الباقون، وهي ثلاثة: ﴿فَأَتْبَعَ سَبَبًا﴾ الذي بعده ﴿حَتَّى إِذَا بَلَغَ مَغْرِبَ الشَّمْسِ﴾، و﴿ثُمَّ أَتْبَعَ سَبَبًا﴾ الذي بعده ﴿حَتَّى إِذَا بَلَغَ مَطْلِعَ الشَّمْسِ﴾، و﴿ثُمَّ أَتْبَعَ سَبَبًا﴾ الذي بعده ﴿حَتَّى إِذَا بَلَغَ بَيْنَ السَّدَّيْنِ﴾ إلى آخر الآية.

### English

I mean that His statement {wa ja'alna baynahuma zar'an} is not counted by the First Madinan and the Makkan, whereas the rest count it. The meaning of my words 'like abadan' and so on is that His statement {an tabida hadhihi abadan} is not counted by the Last Madinan and the Shami, while it is counted by the others. I qualified abadan by its occurrence in recitation after the aforementioned zar'an in order to exclude the other places unanimously counted, such as {makithina fihi abadan}, {wa lan tuflihu idhan abadan}, and {fa-lan yahtadu idhan abadan}. The meaning of my words 'the first sababan' and so on is that the first occurrence of sababan in His statement {wa ataynahu min kulli shay'in sababan} takes the same ruling as zar'an: those who count zar'an count it, and those who omit zar'an omit it. Thus the First Madinan and the Makkan omit it, while the rest count it, just as with zar'an. By saying 'the first,' I excluded the remaining occurrences. I explained their ruling in my words 'the Iraqi adopted the counting of the rest of them': that is, the Iraqi—that is, the Basran and the Kufan—adopted the counting of the remaining occurrences of sababan, while the others did not. They are three: {fa-atba'a sababan}, followed by {hatta idha balagha maghriba al-shams}; {thumma atba'a sababan}, followed by {hatta idha balagha matli'a al-shams}; and {thumma atba'a sababan}, followed by {hatta idha balagha bayna al-saddayn}, to the end of the verse.

## nfb.kahf.note.zaran_abadan_analogy

**Section (Arabic):** سورة الكهف  
**Section (English):** Surat al-Kahf  
**Kind:** technical_note  
**Book page(s):** 42

### Arabic

ففي البيت تشبيه زرعا بأبدا في نفي العد أي انتفى عد زرعا للمدني الأول والمكي كما انتفى عد أبدا للمدني الثاني والشامي.

### English

In the verse, zar'an is likened to abadan with respect to omission from the count. That is, zar'an is not counted by the First Madinan and the Makkan, just as abadan is not counted by the Last Madinan and the Shami.

## nfb.kahf.poem.qawman_amalan

**Section (Arabic):** سورة الكهف  
**Section (English):** Surat al-Kahf  
**Kind:** poem  
**Book page(s):** 43

### Arabic

وقوما أولى الكوف مع ثان فقد ... أعمالا الشامي مع العراق عد

### English

The first qawman is omitted by the Kufan together with the Last Madinan; a'malan is counted by the Shami together with the Iraqi.

## nfb.kahf.commentary.qawman_amalan

**Section (Arabic):** سورة الكهف  
**Section (English):** Surat al-Kahf  
**Kind:** commentary  
**Book page(s):** 43

### Arabic

وأقول: المعنى أن كلمة قوما الأولى في قوله تعالى: ﴿وَوَجَدَ عِنْدَهَا قَوْمًا﴾ فقد عدها أي أهمله الكوفي والمدني الثاني وعدها غيرهما، والتقييد بالأولى احتراز عن الثانية وهي ﴿وَجَدَ مِنْ دُونِهِمَا قَوْمًا﴾ فلم تعد لأحد. وقوله تعالى: ﴿هَلْ نُنَبِّئُكُمْ بِالْأَخْسَرِينَ أَعْمَالًا﴾ عده الشامي والعراقي -البصري والكوفي- وتركه الحجازيون.

### English

The meaning is that the first occurrence of qawman in His statement {wa wajada 'indaha qawman} is one whose counting the Kufan and the Last Madinan omit, while the others count it. The qualification 'first' excludes the second occurrence, namely {wajada min dunihima qawman}, for no one counts it. And His statement {hal nunabbi'ukum bi-al-akhsarina a'malan} is counted by the Shami and the Iraqi—that is, the Basran and the Kufan—and omitted by the Hijazis.

## nfb.kahf.completion

**Section (Arabic):** سورة الكهف  
**Section (English):** Surat al-Kahf  
**Kind:** completion  
**Book page(s):** 43

### Arabic

تتمة: مواضع الخلف أحد عشر موضعا: ﴿وَزِدْنَاهُمْ هُدى﴾، ﴿مَا يَعْلَمُهُمْ إِلَّا قَلِيل﴾، ﴿ذَلِكَ غَدًا﴾، ﴿زَرْعًا﴾، ﴿هَذِهِ أَبَدًا﴾، ﴿مِنْ كُلِّ شَيْءٍ سَبَبًا﴾، ﴿فَأَتْبَعَ سَبَبًا﴾، ﴿ثُمَّ أَتْبَعَ سَبَبًا﴾ معا، ﴿وَوَجَدَ عِنْدَهَا قَوْمًا﴾، ﴿أَعْمَالًا﴾، والله أعلم.

### English

Completion: the disputed places are eleven: {wa zidnahum huda}; {ma ya'lamuhum illa qalil}; {dhalika ghadan}; {zar'an}; {hadhihi abadan}; {min kulli shay'in sababan}; {fa-atba'a sababan}; {thumma atba'a sababan}, in both occurrences; {wa wajada 'indaha qawman}; and {a'malan}. God knows best.

## nfb.maryam.title

**Section (Arabic):** سورة مريم  
**Section (English):** Surat Maryam  
**Kind:** title  
**Book page(s):** 44

### Arabic

سورة مريم:

### English

Surat Maryam.

## nfb.maryam.poem.ibrahim_madda

**Section (Arabic):** سورة مريم  
**Section (English):** Surat Maryam  
**Kind:** poem  
**Book page(s):** 44

### Arabic

أول إبراهيم للمكي مع ... ثان وأولى مدا الكوفي منع

### English

The first Ibrahim belongs to the Makkan together with the Last Madinan; and the first madda the Kufan withholds.

## nfb.maryam.commentary.ibrahim_madda

**Section (Arabic):** سورة مريم  
**Section (English):** Surat Maryam  
**Kind:** commentary  
**Book page(s):** 44

### Arabic

وأقول: المعنى أن لفظ إبراهيم في أول مواضعه وهو قوله تعالى: ﴿وَاذْكُرْ فِي الْكِتَابِ إِبْرَاهِيمَ﴾ معدود للمكي والمدني الثاني ومتروك لغيرهما. والتقييد بالأول لإخراج الثاني وهو ﴿أَرَاغِبٌ أَنْتَ عَنْ آلِهَتِي يَا إِبْرَاهِيمُ﴾ والثالث وهو ﴿وَمِنْ ذُرِّيَّةِ إِبْرَاهِيم﴾ فإنه متفق على تركهما. وكلمة "مدا" الأولى في قوله تعالى: ﴿فَلْيَمْدُدْ لَهُ الرَّحْمَنُ مَدًّا﴾ منع الكوفي ضمها للآيات المعدودة وضمها غيره. والتقييد بالأولى للاحتراز عن الثانية وهي ﴿وَنَمُدُّ لَهُ مِنَ الْعَذَابِ مَدًّا﴾ فإنها معدودة بالإجماع.

### English

The meaning is that the word Ibrahim in its first occurrence—namely His statement {wa-udhkur fi al-kitabi Ibrahima}—is counted by the Makkan and the Last Madinan, and omitted by the others. The qualification 'first' is there to exclude the second occurrence, namely {a-raghibun anta 'an alihati ya Ibrahimu}, and the third, namely {wa min dhurriyyati Ibrahima}, for there is agreement that both are left uncounted. As for the first occurrence of the word madda in His statement {falyamdud lahu al-Rahmanu maddan}, the Kufan withholds its inclusion among the counted verses, while the others include it. The qualification 'first' is used to exclude the second occurrence, namely {wa namuddu lahu mina al-'adhabi maddan}, for that one is counted by consensus.

## nfb.maryam.note.kaf_ha_ya_ayn_sad

**Section (Arabic):** سورة مريم  
**Section (English):** Surat Maryam  
**Kind:** technical_note  
**Book page(s):** 44

### Arabic

ومواضع الخلاف ثلاثة: الموضعان المذكوران في النظم. والثالث ﴿كهيعص﴾ وقد عدها الكوفي والله أعلم.

### English

The disputed places are three: the two places mentioned in the poem, and the third is {kaf ha ya 'ayn sad}, which the Kufan counts. God knows best.

## nfb.taha.title

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** title  
**Book page(s):** 44

### Arabic

سورة طه:

### English

Surat Taha.

## nfb.taha.poem.kathiran_minni

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 44

### Arabic

معا كثيرا عند بصر أهملا ... مني دمشقي حجازي تلا

### English

Omit both occurrences of kathiran for the Basran; minni is counted by the Dimashqi and the Hijazi.

## nfb.taha.commentary.kathiran_minni

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 44

### Arabic

وأقول: أعني أن كثيرا في الموضعين في قوله تعالى: ﴿كَيْ نُسَبِّحَكَ كَثِيرًا، وَنَذْكُرَكَ كَثِيرًا﴾ أهمل عدهما عند البصري واعتبر عند الباقين، ومني في قوله تعالى: ﴿وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِنِّي﴾ عده الدمشقي والحجازي: المدنيان والمكي. ولم يعده البصري والحمصي والكوفي.

### English

What I mean is that kathiran in the two places in His statement {kay nusabbihaka kathiran, wa nadhkuraka kathiran} is omitted from the count by the Basran and counted by the rest. As for minni in His statement {wa alqaytu 'alayka mahabbatan minni}, it is counted by the Dimashqi and the Hijazi—that is, the two Madinans and the Makkan. The Basran, the Himsi, and the Kufan do not count it.

## nfb.taha.poem.fi_al_yam_tahzan_israil_madyan_musa

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 44

### Arabic

في اليم حمص تحزن إسرائيل مع ... مدين موسى أن لشامي تقع

### English

Fi al-yam belongs to the Himsi; and tahzan, Isra'il, together with Madyan and Musa before an, belong to the Shami.

## nfb.taha.commentary.fi_al_yam_tahzan_israil_madyan_musa

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 44, 45

### Arabic

وأقول: ذكرت في هذا البيت أن قوله تعالى: ﴿فَاقْذِفِيهِ فِي الْيَمِّ﴾ معدود للحمصي ومتروك لغيره، وتقييد اليم بكلمة في لإخراج الخالي منها، وهو ﴿فَلْيُلْقِهِ الْيَمُّ﴾ و﴿فَغَشِيَهُمْ مِنَ الْيَمِّ﴾ فليس شيء منهما رأس آية إجماعا. ثم نبهت على أن في السورة أربعة مواضع تقع في عد الشامي ولا تقع في عد غيره: الموضع الأول تحزن في قوله تعالى: ﴿كَيْ تَقَرَّ عَيْنُهَا وَلا تَحْزَنَ﴾. الثاني إسرائيل في قوله تعالى: ﴿فَأَرْسِلْ مَعَنَا بَنِي إِسْرائيلَ﴾ ولم أقيد هذا الموضع اكتفاء بقرينة ذكره عقب تحزن وقبل موسى، مع ملاحظة أن ﴿يَا بَنِي إِسْرائيلَ﴾ لا يتوهم كونه فاصلة لشدة قصره، وعدم مساواته لفواصل السورة. الثالث مدين في قوله تعالى: ﴿فَلَبِثْتَ سِنِينَ فِي أَهْلِ مَدْيَنَ﴾. الرابع ﴿مُوسَى﴾ في ﴿وَلَقَدْ أَوْحَيْنَا إِلَى مُوسَى أَنْ أَسْرِ﴾، وقيد موسى بكونه واقعا قبل كلمة أن لإخراج غيره مما اتفق على عده، أو على تركه، أو اختلف فيه، ولا تخفى الأمثلة على المتأمل.

### English

In this line I mentioned that His statement {faqdhifihi fi al-yammi} is counted by the Himsi and left uncounted by the others. The qualification of al-yamm by the word fi excludes the occurrences without it, namely {falyulqihi al-yammu} and {faghashiyahum mina al-yammi}; neither of them is a verse ending by consensus. Then I pointed out that in this surah there are four places that fall within the Shami count and do not fall within any other count. The first is tahzan in His statement {kay taqarra 'aynuha wa la tahzana}. The second is Isra'il in His statement {fa-arsil ma'ana bani Isra'ila}. I did not qualify this place, relying on the contextual clue of mentioning it after tahzan and before Musa, while noting that {ya bani Isra'ila} cannot plausibly be taken as a fasilah because of its marked brevity and its lack of correspondence to the surah's other verse endings. The third is Madyan in His statement {falabithta sinina fi ahli Madyana}. The fourth is Musa in {wa laqad awhayna ila Musa an asri}. I qualified Musa by its occurrence before the word an in order to exclude other occurrences that are agreed to be counted, agreed to be omitted, or themselves disputed. The examples are clear to anyone who reflects.

## nfb.taha.poem.futunan_linafsi_ma_ghashiyahum_asifa

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 45

### Arabic

فتونا البصري وشام أتبعا ... كوف لنفسي معه شامي وعى
غشيهم في الثان كوف أسفا ... للمدني الأول والمكي اعرفا

### English

Futunan is followed by the Basran and the Shami; the Kufan, together with the Shami, retained linafsi. In the second occurrence of ghashiyahum the Kufan counts; asifa, take note, belongs to the First Madinan and the Makkan.

## nfb.taha.commentary.futunan_linafsi_ma_ghashiyahum_asifa

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 45

### Arabic

وأقول: ذكرت أن قوله تعالى: ﴿وَفَتَنَّاكَ فُتُونًا﴾ معدود للبصري والشامي ومتروك لغيرهما وأن الكوفي ومعه الشامي قد حفظا عد لنفسي في قوله تعالى: ﴿وَاصْطَنَعْتُكَ لِنَفْسِي﴾ ولم يعده الباقون. وأن غشيهم في الموضع الثاني وهو قوله تعالى: ﴿مَا غَشِيَهُمْ﴾ معدود للكوفي وحده. وتقييده بالموضع الثاني لإخراج الأول وهو ﴿فَغَشِيَهُم﴾ فليس معدودا لأحد. وأن أسفا في قوله تعالى: ﴿غَضْبَانَ أَسِفًا﴾ معدود للمدني الأول والمكي ومتروك لغيرهما.

### English

I stated that His statement {wa fatannaka futunan} is counted by the Basran and the Shami and omitted by the others; that the Kufan, together with the Shami, retained the counting of linafsi in His statement {wa-istana'tuka linafsi}; and that the others do not count it. And ghashiyahum in the second place—namely His statement {ma ghashiyahum}—is counted by the Kufan alone. I qualified it as the second occurrence to exclude the first, namely {faghashiyahum}, for that is counted by no one. And asifa in His statement {ghadbana asifa} is counted by the First Madinan and the Makkan and omitted by the others.

## nfb.taha.poem.alqa_al_samiri_wadan_hasanan_qawlan

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 45

### Arabic

للثان ألقى السامري فارددا ... وحسنا قولا ولا له اعددا

### English

For the Last Madinan, reject {alqa al-Samiri}; and count for him {wa'dan hasanan} and the qawlan before la.

## nfb.taha.commentary.alqa_al_samiri_wadan_hasanan_qawlan

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 46

### Arabic

وأقول: أمرت في هذا البيت برد أي بعدم عد قوله تعالى: ﴿فَكَذَلِكَ أَلْقَى السَّامِرِيُّ﴾ للمدني الثاني فيكون معدودا للباقين. وتقييد لفظ السامري بألقى للاحتراز عن غيره وهو ﴿وَأَضَلَّهُمُ السَّامِرِي﴾ و﴿قَالَ فَمَا خَطْبُكَ يَا سَامِرِيُّ﴾ فهذان الموضعان معدودان اتفاقا. ثم أمرت بعد قوله تعالى: ﴿وَعْدًا حَسَنًا﴾ وقوله "قولا" الذي بعده "ولا" وهو ﴿أَلَّا يَرْجِعُ إِلَيْهِمْ قَوْلًا﴾ للمدني الثاني فيكون هذان الموضعان متروكين لغيره، فالضمير في قولي: "له" يعود على المدني الثاني. وتقييد "قولا" بوقوعه قبل ولا للاحتراز عن قوله تعالى: ﴿وَرَضِيَ لَهُ قَوْلًا﴾ فإنه معدود إجماعا.

### English

In this line I instructed that His statement {fakadhalika alqa al-Samiriyyu} be rejected—that is, not counted—for the Last Madinan, and thus counted by the rest. The qualification of al-Samiri by alqa is to exclude the other occurrences, namely {wa adallahumu al-Samiri} and {qala fama khatbuka ya Samiriyyu}; both of these are counted by agreement. Then I directed that, for the Last Madinan, the place after His statement {wa'dan hasanan} and the qawlan that comes before la—namely {alla yarji'a ilayhim qawlan}—be counted, so these two places are omitted by the others. The pronoun in my words 'for him' refers to the Last Madinan. I qualified qawlan by its occurrence before la in order to exclude His statement {wa radiya lahu qawlan}, for that is counted by consensus.

## nfb.taha.poem.ilahu_musa_fanasiya

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 46

### Arabic

إله موسى عند مك رويا ... مع أول ولهما اترك نسيا

### English

Ilahu Musa is narrated for the Makkan together with the First Madinan; and for those two omit fanasiya.

## nfb.taha.commentary.ilahu_musa_fanasiya

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 46

### Arabic

وأقول: بينت أن قوله تعالى: ﴿وَإِلَهُ مُوسَى﴾ روى عده عن المكي والمدني الأول فيكون متروكا للباقين. وتقييد موسى بوقوعه بعد لفظ "إله" للاحتراز عن غيره كما سبق. ثم أمرت بترك عد قوله تعالى: ﴿فَنَسِي﴾ للمكي والمدني الأول. فيكون معدودا للباقين فمن يعد ﴿وَإِلَهُ مُوسَى﴾ لا يعد ﴿فَنَسِي﴾ وبالعكس.

### English

I explained that His statement {wa ilahu Musa} is narrated as counted by the Makkan and the First Madinan, and is therefore omitted by the others. I qualified Musa by its occurrence after the word ilahu in order to exclude the other occurrences, as mentioned before. Then I instructed that His statement {fanasiya} be left uncounted for the Makkan and the First Madinan; it is therefore counted by the rest. Thus, whoever counts {wa ilahu Musa} does not count {fanasiya}, and vice versa.

## nfb.taha.poem.raaytahum_dallu_safsafa

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 46

### Arabic

رأيتهم ضلوا لكوف اعددا ... وصفصفا عن الحجازي ارددا

### English

Count {ra'aytahum dallu} for the Kufan; and reject safsafa for the Hijazi.

## nfb.taha.commentary.raaytahum_dallu_safsafa

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 46

### Arabic

وأقول: أمرت بعد قوله تعالى: ﴿إِذْ رَأَيْتَهُمْ ضَلُّوا﴾ للكوفي فيكون متروكا للباقين، وبعدم عد ﴿قَاعًا صَفْصَفًا﴾ للحجازي -المدنيين والمكي- فيكون معدودا للعراقيين والشامي.

### English

I instructed that after His statement {idh ra'aytahum dallu} it be counted for the Kufan, and so omitted by the others; and that {qa'an safsafan} be left uncounted for the Hijazi—that is, the two Madinans and the Makkan—so it is counted by the Iraqis and the Shami.

## nfb.taha.poem.minni_hudan_dunya_dankan

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** poem  
**Book page(s):** 46

### Arabic

مني هدى وثاني الدنيا يرد ... كوف وحمصي وضنكا عنه عد

### English

{minni hudan} and the second al-dunya are rejected by the Kufan and the Himsi; and count dankan for the latter.

## nfb.taha.commentary.minni_hudan_dunya_dankan

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** commentary  
**Book page(s):** 47

### Arabic

وأقول: المعنى أن قوله تعالى: ﴿فَإِمَّا يَأْتِيَنَّكُمْ مِنِّي هُدًى﴾ وقوله تعالى: ﴿زَهْرَةَ الْحَيَاةِ الدُّنْيَا﴾ وهو المراد بقولي ثاني الدنيا يرد عدهما الكوفي والحمصي ويعدهما الباقون. وتقييد هدى بوقوعه بعد كلمة مني للاحتراز عن قوله تعالى: ﴿أَوْ أَجِدُ عَلَى النَّارِ هُدى﴾ فمتفق على عده. وتقييد الدنيا بالثاني للاحتراز عن الموضع الأول وهو ﴿إِنَّمَا تَقْضِي هَذِهِ الْحَيَاةَ الدُّنْيَا﴾ فإنه معدود اتفاقا أيضا. وقوله تعالى: ﴿فَإِنَّ لَهُ مَعِيشَةً ضَنْكًا﴾ عد عن الحمصي دون غيره. فالضمير في عنه يعود على الحمصي.

### English

The meaning is that His statement {fa-imma ya'tiyannakum minni hudan} and His statement {zahrata al-hayati al-dunya}—which is what I mean by 'the second al-dunya'—have their counting rejected by the Kufan and the Himsi, while the others count them. I qualified hudan by its occurrence after the word minni in order to exclude His statement {aw ajidu 'ala al-nari hudan}, which is counted by agreement. I qualified al-dunya as the second occurrence to exclude the first, namely {innama taqdi hadhihi al-hayata al-dunya}, for that too is counted by consensus. And His statement {fa-inna lahu ma'ishatan dankan} is counted by the Himsi alone. The pronoun in 'for him' refers to the Himsi.

## nfb.taha.completion

**Section (Arabic):** سورة طه  
**Section (English):** Surat Taha  
**Kind:** completion  
**Book page(s):** 47

### Arabic

تكميل: مواضع الخلف في هذه السورة اثنان وعشرون موضعا، وقد اشتمل النظم على بيان واحد وعشرين فقط، فالثاني والعشرون هو قوله تعالى: ﴿طه﴾. وقد انفرد الكوفي بعده كما سبق والله أعلم.

### English

Completion: the disputed places in this surah are twenty-two. The poem contains the explanation of only twenty-one of them; the twenty-second is His statement {Ta Ha}. The Kufan alone counts it, as mentioned earlier. God knows best.

## nfb.anbiya_hajj.title

**Section (Arabic):** سورة الأنبياء والحج  
**Section (English):** Surat al-Anbiya' and Surat al-Hajj  
**Kind:** title  
**Book page(s):** 47

### Arabic

سورة الأنبياء والحج:

### English

Surat al-Anbiya' and Surat al-Hajj.

## nfb.anbiya_hajj.poem.yadurrukum_hamim_thamud_lut_muslimin

**Section (Arabic):** سورة الأنبياء والحج  
**Section (English):** Surat al-Anbiya' and Surat al-Hajj  
**Kind:** poem  
**Book page(s):** 47

### Arabic

يضركم كوف مع الحميم مع ... ما بعده ثمود للشامي دع
لوط لشامي مع البصري اترك ... والمسلمين الخلف للمكي حكي

### English

The Kufan counts yadurrukum together with al-hamim and what follows it; as for Thamud, omit it for the Shami. Omit Lut for the Shami together with the Basran; and regarding al-muslimin, disagreement is reported for the Makkan.

## nfb.anbiya_hajj.commentary.yadurrukum_hamim_julud_thamud_lut

**Section (Arabic):** سورة الأنبياء والحج  
**Section (English):** Surat al-Anbiya' and Surat al-Hajj  
**Kind:** commentary  
**Book page(s):** 47, 48

### Arabic

وأقول: في سورة الأنبياء موضع واحد مختلف فيه وهو قوله تعالى: ﴿مَا لا يَنْفَعُكُمْ شَيْئًا وَلا يَضُرُّكُمْ﴾ وقد أخبرت أن الكوفي وحده يعده. وكذا يعد قوله تعالى في سورة الحج: ﴿يُصَبُّ مِنْ فَوْقِ رُؤُوسِهِمُ الْحَمِيمُ﴾ وقوله تعالى فيها أيضا: ﴿يُصْهَرُ بِهِ مَا فِي بُطُونِهِمْ وَالْجُلُودُ﴾ وهذا الموضع هو المراد بقولي: "مع ما بعده" فالكوفي يعد هذه المواضع الثلاثة وغيره يتركها، ثم أمرت بترك عد قوله تعالى: ﴿وَعَادٌ وَثَمُود﴾ للشامي فيكون معدودا لسواه من علماء العدد. كما أمرت بترك عد قوله تعالى: ﴿وَقَوْمُ لُوط﴾ للشامي والبصري فيكون معدودا للحجازيين والكوفي، فالشامي يترك عد الموضعين معا والبصري يترك عد الثاني فقط.

### English

What I mean is that in Surat al-Anbiya' there is one disputed place only, namely His statement {ma la yanfa'ukum shay'an wa la yadurrukum}; I stated that the Kufan alone counts it. Likewise, in Surat al-Hajj he counts His statement {yusabbu min fawqi ru'usihim al-hamim}, and also His statement {yusharu bihi ma fi butunihim wa al-julud}; this latter place is what I intended by my phrase 'together with what follows it.' Thus the Kufan counts these three places and everyone else omits them. Then I directed that the counting of His statement {wa 'Adun wa Thamud} be omitted for the Shami, so it is counted by the other verse-counting authorities. I likewise directed that the counting of His statement {wa qawmu Lut} be omitted for the Shami and the Basran, so it is counted by the Hijazis and the Kufan. Thus the Shami omits the counting of both places together, whereas the Basran omits only the second of them.

## nfb.hajj.technical_note.muslimin_makki_dispute

**Section (Arabic):** سورة الحج  
**Section (English):** Surat al-Hajj  
**Kind:** technical_note  
**Book page(s):** 48

### Arabic

ثم ذكرت أن قوله تعالى: ﴿هُوَ سَمَّاكُمُ الْمُسْلِمِين﴾ حكى فيه العلماء الخلاف للمكي فذهب بعضهم إلى أن المكي ما كان يعد هذا الموضع ضمن الآيات المعدودة، وذهب البعض إلى أنه كان يعده وهذا هو الراجح؛ لأن الإمام الداني في كتابه "البيان" لم يذكر خلافا عن المكي في هذا الموضع بل جزم بأن المكي كان يعده.

### English

Then I mentioned that, concerning His statement {huwa sammakumu al-muslimin}, the scholars reported disagreement for the Makkan. Some held that the Makkan did not count this place among the counted verses, while others held that he did count it; and this latter view is the preferred one, because Imam al-Dani, in his book al-Bayan, did not mention any disagreement from the Makkan at this place, but rather stated decisively that the Makkan did count it.

## nfb.hajj.completion

**Section (Arabic):** سورة الحج  
**Section (English):** Surat al-Hajj  
**Kind:** completion  
**Book page(s):** 48

### Arabic

ومواضع الخلاف في سورة الحج خمسة ﴿الْحَمِيم﴾ ﴿وَالْجُلُود﴾ ﴿وَثَمُود﴾ ﴿وَقَوْمُ لُوط﴾ و﴿سَمَّاكُمُ الْمُسْلِمِين﴾ والله تعالى أعلم.

### English

Completion: the disputed places in Surat al-Hajj are five: {al-hamim}, {wa al-julud}, {Thamud}, {wa qawmu Lut}, and {sammakumu al-muslimin}. God Most High knows best.

## nfb.muminun_nur.title

**Section (Arabic):** سورة المؤمنين والنور  
**Section (English):** Surat al-Mu'minun and Surat al-Nur  
**Kind:** title  
**Book page(s):** 48

### Arabic

سورة المؤمنين والنور:

### English

Surat al-Mu'minun and Surat al-Nur.

## nfb.muminun_nur.poem.harun_asal_absar

**Section (Arabic):** سورة المؤمنين والنور  
**Section (English):** Surat al-Mu'minun and Surat al-Nur  
**Kind:** poem  
**Book page(s):** 48

### Arabic

هارون للكوفي والحمصي يرد ... والشام كالعراق والآصال عد
واعدد لهؤلاء بالأبصار ... ودع لحمص لأولي الأبصار

### English

Harun is omitted for the Kufan and the Himsi; and the Shami, like the Iraqi authorities, counts al-asal. Count, for those same authorities, bi-al-absar; and omit li-uli al-absar for the Himsi.

## nfb.muminun.commentary.harun

**Section (Arabic):** سورة المؤمنين  
**Section (English):** Surat al-Mu'minun  
**Kind:** commentary  
**Book page(s):** 48

### Arabic

وأقول: في سورة المؤمنين موضع واحد مختلف فيه وهو قوله تعالى: ﴿ثُمَّ أَرْسَلْنَا مُوسَى وَأَخَاهُ هَارُونَ﴾ فأنبأت أن هذا الموضع يترك في العد للكوفي والحمصي ويعد لغيرهما.

### English

What I mean is that in Surat al-Mu'minun there is one disputed place only, namely His statement {thumma arsalna Musa wa akhahu Harun}; I indicated that this place is omitted in the counting by the Kufan and the Himsi, and counted by everyone else.

## nfb.nur.commentary.asal_absar_uli_absar

**Section (Arabic):** سورة النور  
**Section (English):** Surat al-Nur  
**Kind:** commentary  
**Book page(s):** 48

### Arabic

ثم بينت أن الشامي والعراقي أي البصري والكوفي عدوا قوله تعالى: ﴿يُسَبِّحُ لَهُ فِيهَا بِالْغُدُوِّ وَالْآصَالِ﴾ فيكون هذا الموضع ساقطا في عدد الحجازيين. ثم أمرت بعد قوله تعالى: ﴿يَذْهَبُ بِالْأَبْصَار﴾ للشامي والعراقي أيضا فيكون كسابقه يعده من يعده، ويتركه من يتركه. فاسم الإشارة في قولي: "لهؤلاء" يعود على الشامي والعراقي في البيت قبله. وأتيت باسم الإشارة الدال على الجمع لأن المراد بالعراقي البصري والكوفي كما علمت غير مرة. وهذان مع الشامي جمع فلذا قلت: "لهؤلاء" ثم أمرت بترك عد قوله تعالى: ﴿إِنَّ فِي ذَلِك لَعِبْرَةً لِأُولِي الْأَبْصَارِ﴾ للحمصي فيكون معدودا لغيره من علماء العدد. وقيدت الأبصار الأول بالباء، والثاني بـ"لأولى" احترازا عن قوله تعالى: ﴿تَتَقَلَّبُ فِيهِ الْقُلُوبُ وَالْأَبْصَارُ﴾ فإنه معدود بالإجماع.

### English

Then I explained that the Shami and the Iraqi—that is, the Basran and the Kufan—counted His statement {yusabbihu lahu fiha bi-al-ghuduwwi wa al-asal}; thus this place drops out of the count of the Hijazis. Then I directed that His statement {yadhhabu bi-al-absar} also be counted for the Shami and the Iraqi, so it follows the previous one: those who count that count this, and those who omit that omit this. The demonstrative pronoun in my phrase 'for these' refers back to the Shami and the Iraqi in the preceding verse. I used a plural demonstrative because by 'the Iraqi' I mean the Basran and the Kufan, as you have already learned more than once; and those two, together with the Shami, make a plural, hence my saying 'for these.' Then I directed that the counting of His statement {inna fi dhalika la'ibratan li-uli al-absar} be omitted for the Himsi, so it is counted by the other verse-counting authorities. I qualified the first occurrence of al-absar with the prefixed bi-, and the second with 'li-uli,' as a safeguard against confusion with His statement {taqallabu fihi al-qulubu wa al-absar}, for that is counted by consensus.

## nfb.nur.completion

**Section (Arabic):** سورة النور  
**Section (English):** Surat al-Nur  
**Kind:** completion  
**Book page(s):** 48

### Arabic

ومواضع الخلاف في سورة النور ثلاثة: ﴿بِالْغُدُوِّ وَالْآصَال﴾ و﴿يَذْهَبُ بِالْأَبْصَار﴾ و﴿لِأُولِي الْأَبْصَارِ﴾ .

### English

Completion: the disputed places in Surat al-Nur are three: {bi-al-ghuduwwi wa al-asal}, {yadhhabu bi-al-absar}, and {li-uli al-absar}.

## nfb.shuara.title

**Section (Arabic):** سورة الشعراء  
**Section (English):** Surat al-Shu'ara'  
**Kind:** title  
**Book page(s):** 49

### Arabic

سورة الشعراء:

### English

Surat al-Shu'ara'.

## nfb.shuara.poem.talamun_tabudun_bihi_al_shayatin

**Section (Arabic):** سورة الشعراء  
**Section (English):** Surat al-Shu'ara'  
**Kind:** poem  
**Book page(s):** 49

### Arabic

أول تعلمون كوف أهمله ... ثالث تعبدون بصر حظله
به الشياطين اعددن لكلهم ... لا المدني الأخير مع مكيهم

### English

The Kufan omits the first ta'lamun; the Basran withholds the third ta'budun. Count bihi al-shayatin for them all, except the Last Madinan together with the Makkan.

## nfb.shuara.commentary.talamun_tabudun_bihi_al_shayatin

**Section (Arabic):** سورة الشعراء  
**Section (English):** Surat al-Shu'ara'  
**Kind:** commentary  
**Book page(s):** 49

### Arabic

وأقول: اشتمل البيت الأول على بيان أن لفظ تعلمون الأول وهو قوله تعالى: ﴿فَلَسَوْفَ تَعْلَمُون﴾ أهمله الكوفي وعده غيره والتقييد بالأول للاحتراز عن الموضع الثاني وهو قوله تعالى: ﴿أَمَدَّكُمْ بِمَا تَعْلَمُون﴾ فإنه معدود إجماعا وأن لفظ تعبدون في ثلث مواضعه وهو قوله تعالى: ﴿وَقِيلَ لَهُمْ أَيْنَ مَا كُنْتُمْ تَعْبُدُونَ﴾ حظل أي منع عده البصري وعده الباقون. وتقييده بالثالث لإخراج الموضعين قبله وهما ﴿إِذْ قَالَ لِأَبِيهِ وَقَوْمِهِ مَا تَعْبُدُونَ﴾ و﴿قَالَ أَفَرَأَيْتُمْ مَا كُنْتُمْ تَعْبُدُون﴾ فلا خلاف في عدهما واشتمل البيت الثاني على الأمر بعد قوله تعالى: ﴿وَمَا تَنَزَّلَتْ بِهِ الشَّيَاطِينُ﴾ لكل أئمة العدد إلا المدني الأخير والمكي فلا يعدانه. وتقييد لفظ الشياطين بكلمة "به" للاحتراز عن قوله تعالى: ﴿عَلَى مَنْ تَنَزَّلُ الشَّيَاطِين﴾ فإنه متفق على عده.

### English

What I mean is that the first line states that the first occurrence of the word ta'lamun—namely His statement {fa-lasawfa ta'lamun}—is omitted by the Kufan and counted by the others. The qualification 'first' is there to exclude the second occurrence, namely {amaddakum bima ta'lamun}, for that is counted by consensus. And the word ta'budun, in the third of its occurrences—namely His statement {wa qila lahum ayna ma kuntum ta'budun}—is withheld from the count by the Basran, while the rest count it. Restricting it to the third excludes the two occurrences before it, namely {idh qala li-abihi wa qawmihi ma ta'budun} and {qala a-fa-ra'aytum ma kuntum ta'budun}, for there is no disagreement over counting those two. The second line contains the instruction to count, after His statement {wa ma tanazzalat bihi al-shayatin}, for all the verse-counting authorities except the Last Madinan and the Makkan, who therefore do not count it. The qualification of al-shayatin by the word bihi excludes His statement {ala man tanazzalu al-shayatin}, for that is agreed upon as counted.

## nfb.shuara.note.tasm

**Section (Arabic):** سورة الشعراء  
**Section (English):** Surat al-Shu'ara'  
**Kind:** technical_note  
**Book page(s):** 49

### Arabic

تنبيه: دل النظم على أن مواضع الخلاف في هذه السورة ثلاثة "تعلمون" و"تعبدون" و"به الشياطين" ويزاد رابع وهو طسم، فالكوفي يعده وغيره يتركه كما علمت والله أعلم.

### English

Note: the poem indicates that the disputed places in this surah are three: ta'lamun, ta'budun, and bihi al-shayatin. A fourth is added, namely Ta Sin Mim; the Kufan counts it and the others leave it, as you already know. And God knows best.

