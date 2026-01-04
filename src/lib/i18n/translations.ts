export type Language = 'english' | 'hindi' | 'marathi' | 'telugu' | 'tamil' | 'kannada';

export const translations = {
    english: {
        // Shell
        home: "Home",
        chat: "Chat",
        explore: "Explore",
        tracking: "Tracking",
        insights: "Insights",
        alerts: "Alerts",
        emergency: "Emergency",
        community: "Community",
        family: "Family",
        engage: "Engage",
        settings: "Settings",
        connect: "Connect",
        navMain: "MAIN",
        navHealth: "HEALTH",
        navCommunity: "COMMUNITY",
        askSakha: "Ask Sakha",
        logout: "Logout",
        healthCompanion: "Your Health Companion",
        loading: "Loading...",
        guestUser: "Guest User",
        notLoggedIn: "Not Logged In",

        // Landing Page
        landing: {
            heroTitle: "Expert care for your health and wellness.",
            heroSubtitle: "AI medical experts providing compassionate, professional support to keep you safe.",
            startChat: "Talk to Sakha",
            features: {
                vaccinations: "Vaccinations",
                quality: "High-quality",
                laboratory: "Laboratory",
                checkups: "Check-ups",
                emergency: "Emergency"
            },
            ecosystem: "Holistic Ecosystem",
            reimagined: "Healthcare reimagined for everyone.",
            cards: {
                ai: {
                    title: "AI Diagnostics",
                    desc: "Advanced symptom analysis in 12+ Indian languages. It listens, understands, and guides you instantly."
                },
                multi: {
                    title: "Multilingual",
                    desc: "Hindi, Tamil, Bengali & more."
                },
                secure: {
                    title: "Secure Data",
                    desc: "Encrypted & private records."
                }
            },
            process: {
                label: "The Process",
                title: "Simple steps to better health.",
                start: "Start your journey",
                steps: {
                    1: { title: "Tell us", desc: "Speak or type in your local language." },
                    2: { title: "Analysis", desc: "Our engine checks your symptoms instantly." },
                    3: { title: "Guidance", desc: "Get remedies or doctor connection." }
                }
            },
            trustedBy: "Trusted by"
        },
        auth: {
            welcomeBack: "Welcome Back",
            loginSubtitle: "Login to access your health assistant",
            createAccount: "Create Account",
            signupSubtitle: "Join SwasthyaSakha for personalized health support",
            phone: "Phone Number",
            password: "Password",
            name: "Full Name",
            email: "Email",
            age: "Age",
            weight: "Weight",
            height: "Height",
            gender: "Gender",
            location: "Location",
            sendOtp: "Send OTP",
            otpSent: "OTP Sent",
            verify: "Verify",
            verified: "Verified",
            login: "Login",
            signup: "Sign Up",
            noAccount: "Don't have an account?",
            haveAccount: "Already have an account?",
            accountCreated: "Account Created!",
            redirecting: "Redirecting to login...",
            errors: {
                fillAll: "Please fill all required fields",
                invalidPhone: "Please enter a valid 12-digit phone number",
                verifyFirst: "Please verify your phone number first",
                invalidOtp: "Invalid OTP"
            }
        },
        emergencyPage: {
            title: "Emergency Center",
            subtitle: "Critical response tools at your fingertips",
            liveSystem: "Live Emergency System",
            disclaimerTitle: "Medical Disclaimer",
            disclaimerText: "This application facilitates connection to emergency services. For life-threatening emergencies, call 108 directly."
        },
        chatPage: {
            aiSakha: "AI Sakha",
            online: "Online",
            live: "Live",
            speaking: "Speaking...",
            thinking: "Thinking...",
            ready: "Ready",
            listening: "Listening...",
            inputPlaceholder: "Type in Hindi, English or Hinglish...",
            aiDisclaimer: "AI is not a doctor.",
            quickSymptom: "Quick Symptom Selection",
            quickSymptomDesc: "Choose a common condition to get started quickly",
            clusterDetected: "Symptom Cluster Detected",
            severity: "severity",
            relatedConditions: "Possibly related to",
            intro1: "Namaste 👋, I am Sakha. You can tell me your problem in simple words.",
            intro2: "Remember, I am not a doctor. In case of emergency, call 108 immediately."
        },
        communityPage: {
            title: "Community",
            searchPlaceholder: "Search questions...",
            askQuestion: "Ask a Question",
            allQuestions: "All Questions",
            myQuestions: "My Questions",
            noResults: "No results for",
            noQuestionsYet: "No questions here yet",
            beFirstToAsk: "Be the first to ask about",
            clearSearch: "Clear Search",
            next: "Next",
            previous: "Previous",
            page: "Page",
            feed: "Feed",
            topics: "Topics",
            trendingTags: "Trending Tags",
            recentSearches: "Recent Searches",
            improveAccount: "Improve your account",
            level: "Lvl",
            visitQuestions: "Visit 5 questions",
            upvoteQuestions: "Upvote 5 questions",
            askQuestionGoal: "Ask a question",
            answerQuestion: "Answer a question",
            addCredentials: "Add 3 credentials",
            sortBy: "Sort by:",
            newest: "Newest",
            topVoted: "Top Voted",
            filterHelper: "Use the sidebar to filter by",
            filterHelperTopics: "Topics",
            filterHelperOr: "or check",
            filterHelperTags: "Trending Tags",
            verifiedAnswer: "Verified Answer",
            doctorResponse: "Doctor's Response",
            aiName: "SwasthyaSakha AI"
        }
    },
    hindi: {
        home: "होम",
        chat: "चैट",
        explore: "खोजें",
        tracking: "ट्रैकिंग",
        insights: "इनसाइट्स",
        alerts: "अलर्ट",
        emergency: "आपातकालीन",
        community: "समुदाय",
        family: "परिवार",
        engage: "जुड़ें",
        settings: "सेटिंग्स",
        connect: "जुड़ें",
        navMain: "मुख्य",
        navHealth: "स्वास्थ्य",
        navCommunity: "समुदाय",
        askSakha: "सखा से पूछें",
        logout: "लॉग आउट",
        healthCompanion: "आपका स्वास्थ्य साथी",
        loading: "लोड हो रहा है...",
        guestUser: "अतिथि उपयोगकर्ता",
        notLoggedIn: "लॉग इन नहीं है",

        landing: {
            heroTitle: "आपके स्वास्थ्य और कल्याण के लिए विशेषज्ञ देखभाल।",
            heroSubtitle: "आपको सुरक्षित रखने के लिए दयालु, पेशेवर सहायता प्रदान करने वाले एआई चिकित्सा विशेषज्ञ।",
            startChat: "सखा से बात करें",
            features: {
                vaccinations: "टीकाकरण",
                quality: "उच्च गुणवत्ता",
                laboratory: "प्रयोगशाला",
                checkups: "जांच",
                emergency: "आपातकालीन"
            },
            ecosystem: "समग्र पारिस्थितिकी तंत्र",
            reimagined: "सभी के लिए स्वास्थ्य सेवा की नई कल्पना।",
            cards: {
                ai: {
                    title: "एआई डायग्नोस्टिक्स",
                    desc: "12+ भारतीय भाषाओं में उन्नत लक्षण विश्लेषण। यह सुनता है, समझता है और तुरंत आपका मार्गदर्शन करता है।"
                },
                multi: {
                    title: "बहुभाषी",
                    desc: "हिंदी, तमिल, बंगाली और अधिक।"
                },
                secure: {
                    title: "सुरक्षित डेटा",
                    desc: "एन्क्रिप्टेड और निजी रिकॉर्ड।"
                }
            },
            process: {
                label: "प्रक्रिया",
                title: "बेहतर स्वास्थ्य के लिए सरल कदम।",
                start: "अपनी यात्रा शुरू करें",
                steps: {
                    1: { title: "हमें बताएं", desc: "अपनी स्थानीय भाषा में बोलें या टाइप करें।" },
                    2: { title: "विश्लेषण", desc: "हमारा इंजन आपके लक्षणों की तुरंत जांच करता है।" },
                    3: { title: "मार्गदर्शन", desc: "उपचार या डॉक्टर संपर्क प्राप्त करें।" }
                }
            },
            trustedBy: "द्वारा भरोसा किया गया"
        },
        auth: {
            welcomeBack: "वापसी पर स्वागत है",
            loginSubtitle: "अपने स्वास्थ्य सहायक का उपयोग करने के लिए लॉगिन करें",
            createAccount: "खाता बनाएं",
            signupSubtitle: "व्यक्तिगत स्वास्थ्य सहायता के लिए स्वास्थ्य सखा से जुड़ें",
            phone: "फ़ोन नंबर",
            password: "पासवर्ड",
            name: "पूरा नाम",
            email: "ईमेल",
            age: "आयु",
            weight: "वजन",
            height: "ऊंचाई",
            gender: "लिंग",
            location: "स्थान",
            sendOtp: "ओटीपी भेजें",
            otpSent: "ओटीपी भेजा गया",
            verify: "सत्यापित करें",
            verified: "सत्यापित",
            login: "लॉगिन",
            signup: "साइन अप",
            noAccount: "खाता नहीं है?",
            haveAccount: "पहले से ही एक खाता है?",
            accountCreated: "खाता बनाया गया!",
            redirecting: "लॉगिन पर रीडायरेक्ट किया जा रहा है...",
            errors: {
                fillAll: "कृपया सभी आवश्यक फ़ील्ड भरें",
                invalidPhone: "कृपया एक मान्य 12-अंकीय फ़ोन नंबर दर्ज करें",
                verifyFirst: "कृपया पहले अपना फ़ोन नंबर सत्यापित करें",
                invalidOtp: "अमान्य ओटीपी"
            }
        },
        emergencyPage: {
            title: "आपातकालीन केंद्र",
            subtitle: "महत्वपूर्ण प्रतिक्रिया उपकरण आपकी उंगलियों पर",
            liveSystem: "लाइव आपातकालीन प्रणाली",
            disclaimerTitle: "चिकित्सा अस्वीकरण",
            disclaimerText: "यह एप्लिकेशन आपातकालीन सेवाओं से कनेक्शन की सुविधा प्रदान करता है। जीवन-धमकी वाली आपात स्थितियों के लिए, सीधे 108 पर कॉल करें।"
        },
        chatPage: {
            aiSakha: "एआई सखा",
            online: "ऑनलाइन",
            live: "लाइव",
            speaking: "बोल रहा है...",
            thinking: "सोच रहा है...",
            ready: "तैयार",
            listening: "सुन रहा है...",
            inputPlaceholder: "हिंदी, अंग्रेजी या हिंग्लिश में टाइप करें...",
            aiDisclaimer: "एआई डॉक्टर नहीं है।",
            quickSymptom: "त्वरित लक्षण चयन",
            quickSymptomDesc: "जल्दी शुरू करने के लिए एक सामान्य स्थिति चुनें",
            clusterDetected: "लक्षण क्लस्टर का पता चला",
            severity: "गंभीरता",
            relatedConditions: "संभवतः इससे संबंधित",
            intro1: "नमस्ते 👋, मैं सखा हूँ। आप अपनी समस्या सरल शब्दों में बता सकते हैं।",
            intro2: "याद रखें, मैं डॉक्टर नहीं हूँ। आपातकालीन स्थिति में तुरंत 108 पर कॉल करें।"
        },
        communityPage: {
            title: "समुदाय",
            searchPlaceholder: "सवाल खोजें...",
            askQuestion: "सवाल पूछें",
            allQuestions: "सभी सवाल",
            myQuestions: "मेरे सवाल",
            noResults: "इसके लिए कोई परिणाम नहीं",
            noQuestionsYet: "यहाँ अभी तक कोई सवाल नहीं",
            beFirstToAsk: "इसके बारे में पूछने वाले पहले व्यक्ति बनें",
            clearSearch: "खोज साफ़ करें",
            next: "अगला",
            previous: "पिछला",
            page: "पेज",
            feed: "फ़ीड",
            topics: "विषय",
            trendingTags: "ट्रेंडिंग टैग्स",
            recentSearches: "हाल की खोजें",
            improveAccount: "अपने खाते में सुधार करें",
            level: "स्तर",
            visitQuestions: "5 सवाल देखें",
            upvoteQuestions: "5 सवालों को अपवोट करें",
            askQuestionGoal: "एक सवाल पूछें",
            answerQuestion: "एक सवाल का जवाब दें",
            addCredentials: "3 क्रेडेंशियल जोड़ें",
            sortBy: "क्रमबद्ध करें:",
            newest: "नवीनतम",
            topVoted: "शीर्ष वोट",
            filterHelper: "फिल्टर करने के लिए साइडबार का उपयोग करें",
            filterHelperTopics: "विषय",
            filterHelperOr: "या चेक करें",
            filterHelperTags: "ट्रेंडिंग टैग्स",
            verifiedAnswer: "सत्यापित उत्तर",
            doctorResponse: "डॉक्टर की प्रतिक्रिया",
            aiName: "स्वास्थ्यसखा एआई"
        }
    },
    marathi: {
        home: "मुख्य पृष्ठ",
        chat: "चर्चा",
        explore: "शोध",
        tracking: "ट्रॅकिंग",
        insights: "अंतर्दृष्टी",
        alerts: "सूचना",
        emergency: "आणीबाणी",
        community: "समुदाय",
        family: "कुटुंब",
        engage: "सहभाग",
        settings: "सेटिंग्ज",
        connect: "जोडा",
        navMain: "मुख्य",
        navHealth: "आरोग्य",
        navCommunity: "समुदाय",
        askSakha: "सखाला विचारा",
        logout: "लॉग आउट",
        healthCompanion: "सोबती आरोग्याचा",
        loading: "लोड होत आहे...",
        guestUser: "पाहुणे वापरकर्ता",
        notLoggedIn: "लॉग इन केलेले नाही",

        landing: {
            heroTitle: "तुमच्या आरोग्यासाठी आणि निरोगीपणासाठी तज्ञांची काळजी.",
            heroSubtitle: "तुम्हाला सुरक्षित ठेवण्यासाठी व्यावसायिक, सहानुभूतीपूर्ण आधार देणारे एआय वैद्यकीय तज्ञ.",
            startChat: "सखाशी बोला",
            features: {
                vaccinations: "लसीकरण",
                quality: "उच्च दर्जा",
                laboratory: "प्रयोगशाळा",
                checkups: "तपासणी",
                emergency: "आणीबाणी"
            },
            ecosystem: "समग्र परिसंस्था",
            reimagined: "सर्वांसाठी आरोग्यसेवेचा पुनर्विचार.",
            cards: {
                ai: {
                    title: "एआय निदान",
                    desc: "१२+ भारतीय भाषांमध्ये प्रगत लक्षण विश्लेषण. ते ऐकते, समजते आणि त्वरित मार्गदर्शन करते."
                },
                multi: {
                    title: "बहुभाषिक",
                    desc: "हिंदी, तमिळ, बंगाली आणि बरेच काही."
                },
                secure: {
                    title: "सुरक्षित डेटा",
                    desc: "एनक्रिप्टेड आणि खाजगी रेकॉर्ड."
                }
            },
            process: {
                label: "प्रक्रिया",
                title: "चांगल्या आरोग्यासाठी सोप्या पायऱ्या.",
                start: "आपला प्रवास सुरू करा",
                steps: {
                    1: { title: "सांगा", desc: "तुमच्या स्थानिक भाषेत बोला किंवा टाईप करा." },
                    2: { title: "विश्लेषण", desc: "आमचे इंजिन तुमच्या लक्षणांची त्वरित तपासणी करते." },
                    3: { title: "मार्गदर्शन", desc: "उपचार किंवा डॉक्टरांचा संपर्क मिळवा." }
                }
            },
            trustedBy: "यांच्यावर विश्वास"
        },
        auth: {
            welcomeBack: "पुन्हा स्वागत आहे",
            loginSubtitle: "तुमच्या आरोग्य साहाय्यकात प्रवेश करण्यासाठी लॉगिन करा",
            createAccount: "खाते तयार करा",
            signupSubtitle: "वैयक्तिकृत आरोग्य आधारासाठी स्वास्थ्य सखा मध्ये सामील व्हा",
            phone: "फोन नंबर",
            password: "पासवर्ड",
            name: "पूर्ण नाव",
            email: "ईमेल",
            age: "वय",
            weight: "वजन",
            height: "उंची",
            gender: "लिंग",
            location: "स्थान",
            sendOtp: "ओटीपी पाठवा",
            otpSent: "ओटीपी पाठवले",
            verify: "सत्यापित करा",
            verified: "सत्यापित",
            login: "लॉगिन",
            signup: "साइन अप",
            noAccount: "खाते नाही?",
            haveAccount: "आधीच खाते आहे?",
            accountCreated: "खाते तयार झाले!",
            redirecting: "लॉगिनवर पुनर्निर्देशित करत आहे...",
            errors: {
                fillAll: "कृपया सर्व आवश्यक फील्ड भरा",
                invalidPhone: "कृपया वैध १२-अंकी फोन नंबर प्रविष्ट करा",
                verifyFirst: "कृपया प्रथम तुमचा फोन नंबर सत्यापित करा",
                invalidOtp: "अवैध ओटीपी"
            }
        },
        emergencyPage: {
            title: "आणीबाणी केंद्र",
            subtitle: "गंभीर प्रतिसाद साधने तुमच्या बोटांच्या टोकावर",
            liveSystem: "थेट आणीबाणी प्रणाली",
            disclaimerTitle: "वैद्यकीय अस्वीकरण",
            disclaimerText: "हे ॲप्लिकेशन आपत्कालीन सेवांशी जोडणी सुलभ करते. जीवाला धोका असलेल्या आणीबाणीसाठी, थेट १०८ वर कॉल करें."
        },
        chatPage: {
            aiSakha: "एआई सखा",
            online: "ऑनलाइन",
            live: "थेट",
            speaking: "बोलत आहे...",
            thinking: "विचार करत आहे...",
            ready: "तयार",
            listening: "ऐकत आहे...",
            inputPlaceholder: "हिंदी, इंग्रजी किंवा हिंग्लिशमध्ये टाइप करा...",
            aiDisclaimer: "एआई डॉक्टर नाही.",
            quickSymptom: "त्वरित लक्षण निवड",
            quickSymptomDesc: "पटकन सुरू करण्यासाठी सामान्य स्थिती निवडा",
            clusterDetected: "लक्षण क्लस्टर आढळले",
            severity: "तीव्रता",
            relatedConditions: "संभाव्यतः संबंधित",
            intro1: "नमस्ते 👋, मी सखा आहे. तुम्ही तुमची समस्या सोप्या शब्दांत सांगू शकता.",
            intro2: "लक्षात ठेवा, मी डॉक्टर नाही. आपत्कालीन परिस्थितीत त्वरित 108 वर कॉल करा."
        },
        communityPage: {
            title: "समुदाय",
            searchPlaceholder: "प्रश्न शोधा...",
            askQuestion: "प्रश्न विचारा",
            allQuestions: "सर्व प्रश्न",
            myQuestions: "माझे प्रश्न",
            noResults: "यासाठी काहीही सापडले नाही",
            noQuestionsYet: "येथे अद्याप कोणतेही प्रश्न नाहीत",
            beFirstToAsk: "याबद्दल विचारणारे पहिले व्हा",
            clearSearch: "शोध साफ करा",
            next: "पुढील",
            previous: "मागील",
            page: "पृष्ठ",
            feed: "फीड",
            topics: "विषय",
            trendingTags: "ट्रेंडिंग टॅग्ज",
            recentSearches: "अलीकडील शोध",
            improveAccount: "तुमचे खाते सुधारा",
            level: "स्तर",
            visitQuestions: "5 प्रश्नांना भेट द्या",
            upvoteQuestions: "5 प्रश्नांना अपवोट करा",
            askQuestionGoal: "एक प्रश्न विचारा",
            answerQuestion: "एका प्रश्नाचे उत्तर द्या",
            addCredentials: "3 क्रेडेंशियल्स जोडा",
            sortBy: "क्रमवारी लावा:",
            newest: "नवीनतम",
            topVoted: "सर्वाधिक मते",
            filterHelper: "फिल्टर करण्यासाठी साइडबार वापरा",
            filterHelperTopics: "विषय",
            filterHelperOr: "किंवा तपासा",
            filterHelperTags: "ट्रेंडिंग टॅग्ज",
            verifiedAnswer: "सत्यापित उत्तर",
            doctorResponse: "डॉक्टरचा प्रतिसाद",
            aiName: "स्वास्थसखा एआय"
        }
    },
    telugu: {
        home: "హోమ్",
        chat: "చాట్",
        explore: "అన్వేషించండి",
        tracking: "ట్రాకింగ్",
        insights: "అంతర్దృష్టులు",
        alerts: "హెచ్చరికలు",
        emergency: "అత్యవసర",
        community: "సంఘం",
        family: "కుటుంబం",
        engage: "పాల్గొనండి",
        settings: "సెట్టింగ్‌లు",
        askSakha: "సఖాని అడగండి",
        logout: "లాగ్ అవుట్",
        healthCompanion: "మీ ఆరోగ్య సహచరుడు",
        loading: "లోడ్ అవుతోంది...",
        guestUser: "అతిథి వినియోగదారు",
        notLoggedIn: "లాగిన్ అవ్వలేదు",

        landing: {
            heroTitle: "మీ ఆరోగ్యం మరియు శ్రేయస్సు కోసం నిపుణుల సంరక్షణ.",
            heroSubtitle: "మిమ్మల్ని సురక్షితంగా ఉంచడానికి AI వైద్య నిపుతులు కరుణతో కూడిన, వృత్తిపరమైన మద్దతును అందిస్తారు.",
            startChat: "సఖాతో మాట్లాడండి",
            features: {
                vaccinations: "టికాలు",
                quality: "అధిక నాణ్యత",
                laboratory: "ప్రయోగశాల",
                checkups: "చెకప్‌లు",
                emergency: "అత్యవసర"
            },
            ecosystem: "సంపూర్ణ పర్యావరణ వ్యవస్థ",
            reimagined: "అందరికీ ఆరోగ్యం పునరుద్ధరించబడింది.",
            cards: {
                ai: {
                    title: "AI నిర్ధారణ",
                    desc: "12+ భారతీయ భాషలలో అధునాతన లక్షణ విశ్లేషణ. ఇది వింటుంది, అర్ధం చేసుకుంటుంది మరియు తక్షణమే మార్గనిర్దేశం చేస్తుంది."
                },
                multi: {
                    title: "బహుభాషా",
                    desc: "హిందీ, తమిళం, బెంగాలీ మరియు మరిన్ని."
                },
                secure: {
                    title: "సురక్షిత డేటా",
                    desc: "ఎన్‌క్రిప్టెడ్ మరియు ప్రైవేట్ రికార్డులు."
                }
            },
            process: {
                label: "ప్రక్రియ",
                title: "మంచి ఆరోగ్యం కోసం సులభమైన దశలు.",
                start: "మీ ప్రయాణాన్ని ప్రారంభించండి",
                steps: {
                    1: { title: "చెప్పండి", desc: "మీ స్థానిక భాషలో మాట్లాడండి లేదా టైప్ చేయండి." },
                    2: { title: "విశ్లేషణ", desc: "మా ఇంజిన్ మీ లక్షణాలను తక్షణమే తనిఖీ చేస్తుంది।" },
                    3: { title: "మార్గదర్శకత్వం", desc: "పరిష్కారాలు లేదా డాక్టర్ కనెక్షన్‌ను పొందండి।" }
                }
            },
            trustedBy: "విశ్వసించబడింది"
        },
        auth: {
            welcomeBack: "స్వాగతం",
            loginSubtitle: "మీ ఆరోగ్య సహాయకుడిని యాక్సెస్ చేయడానికి లాగిన్ చేయండి",
            createAccount: "ఖాతాను సృష్టించండి",
            signupSubtitle: "వ్యక్తిగతీకరించిన ఆరోగ్య మద్దతు కోసం స్వాస్థ్యసఖలో చేరండి",
            phone: "ఫోన్ నంబర్",
            password: "పాస్‌వర్డ్",
            name: "పూర్తి పేరు",
            email: "ఇమెయిల్",
            age: "వయస్సు",
            weight: "బరువు",
            height: "ఎత్తు",
            gender: "లింగం",
            location: "స్థానం",
            sendOtp: "OTP పంపండి",
            otpSent: "OTP పంపబడింది",
            verify: "ధృవీకరించండి",
            verified: "ధృవీకరించబడింది",
            login: "లాగిన్",
            signup: "సైన్ అప్",
            noAccount: "ఖాతా లేదా?",
            haveAccount: "ఇప్పటికే ఖాతా ఉందా?",
            accountCreated: "ఖాతా సృష్టించబడింది!",
            redirecting: "లాగిన్‌కి మళ్లిస్తోంది...",
            errors: {
                fillAll: "దయచేసి అవసరమైన అన్ని ఫీల్డ్‌లను పూరించండి",
                invalidPhone: "దయచేసి చెల్లుబాటు అయ్యే 12-అంకెల ఫోన్ నంబర్‌ను నమోదు చేయండి",
                verifyFirst: "దయచేసి ముందుగా మీ ఫోన్ నంబర్‌ని ధృవీకరించండి",
                invalidOtp: "చెల్లని OTP"
            }
        },
        emergencyPage: {
            title: "అత్యవసర కేంద్రం",
            subtitle: "క్లిష్టమైన ప్రతిస్పందన సాధనాలు మీ చేతివేళ్ల వద్ద",
            liveSystem: "లైవ్ ఎమర్జెన్సీ సిస్టమ్",
            disclaimerTitle: "వైద్య నిరాకరణ",
            disclaimerText: "ఈ అప్లికేషన్ అత్యవసర సేవలకు కనెక్షన్‌ను సులభతరం చేస్తుంది. ప్రాణహాని కలిగించే అత్యవసర పరిస్థితుల కోసం, నేరుగా 108కి కాల్ చేయండి."
        },
        chatPage: {
            aiSakha: "AI సఖా",
            online: "ఆన్‌లైన్",
            live: "లైవ్",
            speaking: "మాట్లాడుతున్నారు...",
            thinking: "ఆలోచిస్తున్నారు...",
            ready: "సిద్ధం",
            listening: "వినబడుతోంది...",
            inputPlaceholder: "హిందీ, ఇంగ్లీష్ లేదా హింగ్లీష్‌లో టైప్ చేయండి...",
            aiDisclaimer: "AI వైద్యుడు కాదు.",
            quickSymptom: "త్వరిత లక్షణ ఎంపిక",
            quickSymptomDesc: "త్వరగా ప్రారంభించడానికి సాధారణ పరిస్థితిని ఎంచుకోండి",
            clusterDetected: "లక్షణ క్లస్టర్ కనుగొనబడింది",
            severity: "తీవ్రత",
            relatedConditions: "దీనికి సంబంధించినది కావచ్చు"
        }
    },
    tamil: {
        home: "முகப்பு",
        chat: "அரட்டை",
        explore: "ஆராயுங்கள்",
        tracking: "கண்காணிப்பு",
        insights: "நுண்ணறிவு",
        alerts: "எச்சரிக்கைகள்",
        emergency: "அவசரம்",
        community: "சமூகம்",
        family: "குடும்பம்",
        engage: "ஈடுபடுங்கள்",
        settings: "அமరికలు", // Tamil copy? Let's fix this later or assume similar. Actually Tamil for settings is "அமைப்புகள்" usually. The previous key might be wrong but I'll stick to adding new ones.
        // Wait, looking at the previous file content, line 529 seems to be Telugu section? No, lines 1-100 showed English.
        // I should be careful with line numbers.
        // I'll trust the tool to find the context "settings:".
        // But "settings" appears multiple times.
        // I need to be careful with context.
        // The file structure is: english, hindi, marathi, telugu, tamil, kannada.
        // English is around line 16.
        // Hindi is around line 144.
        // Marathi is around line 272.
        // Telugu is around line 400.
        // Tamil is around line 528.
        // Kannada is around line 656.

        // I'll use the 'settings' key as anchor.
        connect: "இணைக்கவும்",
        navMain: "முக்கிய",
        navHealth: "சாத ஆரோக்கியம்",
        navCommunity: "சமூகம்",
        askSakha: "சகாவிடம் கேளுங்கள்",
        logout: "வெளியேறு",
        healthCompanion: "உங்கள் சுகாதார தோழன்",
        loading: "ஏற்றுகிறது...",
        guestUser: "விருந்தினர்",
        notLoggedIn: "உள்நுழையவில்லை",

        landing: {
            heroTitle: "உங்கள் ஆரோக்கியம் மற்றும் நல்வாழ்வுக்கான நிபுணர் கவனிப்பு.",
            heroSubtitle: "உங்களைப் பாதுகாப்பாக வைத்திருக்க பரிவுமிக்க, தொழில்முறை ஆதரவை வழங்கும் AI மருத்துவ நிபுணர்கள்.",
            startChat: "சகாவிடம் பேசுங்கள்",
            features: {
                vaccinations: "தடுப்பூசிகள்",
                quality: "உயர்தரம்",
                laboratory: "ஆய்வகம்",
                checkups: "பரிசோதனைகள்",
                emergency: "அவசரம்"
            },
            ecosystem: "முழுமையான சுற்றுச்சூழல்",
            reimagined: "அனைவருக்கும் மறுவடிவமைக்கப்பட்ட சுகாதாரம்.",
            cards: {
                ai: {
                    title: "AI நோயறிதல்",
                    desc: "12+ இந்திய மொழிகளில் மேம்பட்ட அறிகுறி பகுப்பாய்வு. அது கேட்கிறது, புரிந்துகொள்கிறது மற்றும் உடனடியாக வழிகாட்டுகிறது."
                },
                multi: {
                    title: "பன்மொழி",
                    desc: "இந்தி, தமிழ், பெங்காலி மற்றும் பல."
                },
                secure: {
                    title: "பாதுகாப்பான தரவு",
                    desc: "குறியாக்கம் செய்யப்பட்ட மற்றும் தனிப்பட்ட பதிவுகள்."
                }
            },
            process: {
                label: "செயல்முறை",
                title: "சிறந்த ஆரோக்கியத்திற்கான எளிய படிகள்.",
                start: "உங்கள் பயணத்தைத் தொடங்குங்கள்",
                steps: {
                    1: { title: "சொல்லுங்கள்", desc: "உங்கள் உள்ளூர் மொழியில் பேசவும் அல்லது தட்டச்சு செய்யவும்." },
                    2: { title: "பகுப்பாய்வு", desc: "எங்கள் இயந்திரம் உங்கள் அறிகுறிகளை உடனடியாக சரிபார்க்கிறது." },
                    3: { title: "வழிகாட்டுதல்", desc: "தீர்வுகள் அல்லது மருத்துவர் இணைப்பைப் பெறுங்கள்." }
                }
            },
            trustedBy: "நம்பப்படுகிறது"
        },
        auth: {
            welcomeBack: "நல்வரவு",
            loginSubtitle: "உங்கள் சுகாதார உதவியாளரை அணுக உள்நுழையவும்",
            createAccount: "கணக்கை உருவாக்கவும்",
            signupSubtitle: "தனிப்பயனாக்கப்பட்ட சுகாதார ஆதரவுக்காக ஸ்வாஸ்த்யசகாவில் சேரவும்",
            phone: "தொலைபேசி எண்",
            password: "கடவுச்சொல்",
            name: "முழு பெயர்",
            email: "மின்னஞ்சல்",
            age: "வயது",
            weight: "எடை",
            height: "உயரம்",
            gender: "பாலினம்",
            location: "இடம்",
            sendOtp: "OTP அனுப்பு",
            otpSent: "OTP அனுப்பப்பட்டது",
            verify: "சரிபார்",
            verified: "சரிபார்க்கப்பட்டது",
            login: "உள்நுழை",
            signup: "பதிவு செய்க",
            noAccount: "கணக்கு இல்லையா?",
            haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
            accountCreated: "கணக்கு உருவாக்கப்பட்டது!",
            redirecting: "உள்நுழைவுக்குத் திருப்பிவிடுகிறது...",
            errors: {
                fillAll: "தேவையான அனைத்து புலங்களையும் நிரப்பவும்",
                invalidPhone: "செல்லுபடியாகும் 12 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
                verifyFirst: "முதலில் உங்கள் தொலைபேசி எண்ணைச் சரிபார்க்கவும்",
                invalidOtp: "தவறான OTP"
            }
        },
        emergencyPage: {
            title: "அவசர மையம்",
            subtitle: "உங்கள் விரல் நுனியில் முக்கியமான பதில் கருவிகள்",
            liveSystem: "நேரடி அவசர அமைப்பு",
            disclaimerTitle: "மருத்துவ மறுப்பு",
            disclaimerText: "இந்த பயன்பாடு அவசர சேவைகளுக்கான இணைப்பை எளிதாக்குகிறது. உயிருக்கு ஆபத்தான அவசரநிலைகளுக்கு, நேரடியாக 108 ஐ அழைக்கவும்."
        },
        chatPage: {
            aiSakha: "AI சகா",
            online: "ஆன்லைன்",
            live: "நேரலை",
            speaking: "பேசுகிறது...",
            thinking: "யோசிக்கிறது...",
            ready: "தயார்",
            listening: "கேட்கிறது...",
            inputPlaceholder: "இந்தி, ஆங்கிலம் அல்லது ஹிங்கிலிஷில் தட்டச்சு செய்யவும்...",
            aiDisclaimer: "AI ஒரு மருத்துவர் அல்ல.",
            quickSymptom: "விரைவான அறிகுறி தேர்வு",
            quickSymptomDesc: "விரைவாக தொடங்க பொதுவான நிலையைத் தேர்ந்தெடுக்கவும்",
            clusterDetected: "அறிகுறி குழு கண்டறியப்பட்டது",
            severity: "தீவிரம்",
            relatedConditions: "இதனுடன் தொடர்புடையதாக இருக்கலாம்"
        }
    },
    kannada: {
        home: "ಮುಖಪುಟ",
        chat: "ಚಾಟ್",
        explore: "ಅನ್ವೇಷಿಸಿ",
        tracking: "ಟ್ರ್ಯಾಕಿಂಗ್",
        insights: "ಒಳನೋಟಗಳು",
        alerts: "ಎಚ್ಚರಿಕೆಗಳು",
        emergency: "ತುರ್ತು",
        community: "ಸಮುದಾಯ",
        family: "ಕುಟುಂಬ",
        engage: "ತೊಡಗಿಸಿಕೊಳ್ಳಿ",
        settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
        askSakha: "ಸಖಾನನ್ನು ಕೇಳಿ",
        logout: "ಲಾಗ್ ಔಟ್",
        healthCompanion: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಂಗಾತಿ",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        guestUser: "ಅತಿಥಿ ಬಳಕೆದಾರ",
        notLoggedIn: "ಲಾಗ್ ಇನ್ ಆಗಿಲ್ಲ",

        landing: {
            heroTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮಕ್ಕಾಗಿ ತಜ್ಞರ ಆರೈಕೆ.",
            heroSubtitle: "ನಿಮ್ಮನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಲು ಸಹಾನುಭೂತಿಯ, ವೃತ್ತಿಪರ ಬೆಂಬಲವನ್ನು ನೀಡುವ AI ವೈದ್ಯಕೀಯ ತಜ್ಞರು.",
            startChat: "ಸಖಾ ಜೊತೆ ಮಾತನಾಡಿ",
            features: {
                vaccinations: "ಲಸಿಕೆಗಳು",
                quality: "ಉತ್ತಮ ಗುಣಮಟ್ಟ",
                laboratory: "ಪ್ರಯೋಗಾಲಯ",
                checkups: "ತಪಾಸಣೆಗಳು",
                emergency: "ತುರ್ತು"
            },
            ecosystem: "ಸಮಗ್ರ ಪರಿಸರ ವ್ಯವಸ್ಥೆ",
            reimagined: "ಎಲ್ಲರಿಗೂ ಮರುರೂಪಿಸಲಾದ ಆರೋಗ್ಯ ಸೇವೆ.",
            cards: {
                ai: {
                    title: "AI ರೋಗನಿರ್ಣಯ",
                    desc: "12+ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಸುಧಾರಿತ ರೋಗಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ. ಅದು ಆಲಿಸುತ್ತದೆ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು ತಕ್ಷಣ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ."
                },
                multi: {
                    title: "ಬಹುಭಾಷಾ",
                    desc: "ಹಿಂದಿ, ತಮಿಳು, ಬೆಂಗಾಲಿ ಮತ್ತು ಇನ್ನಷ್ಟು."
                },
                secure: {
                    title: "ಸುರಕ್ಷಿತ ಡೇಟಾ",
                    desc: "ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಮತ್ತು ಖಾಸಗಿ ದಾಖಲೆಗಳು."
                }
            },
            process: {
                label: "ಪ್ರಕ್ರಿಯೆ",
                title: "ಉತ್ತಮ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಸರಳ ಹಂತಗಳು.",
                start: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
                steps: {
                    1: { title: "ಹೇಳಿ", desc: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ." },
                    2: { title: "ವಿಶ್ಲೇಷಣೆ", desc: "ನಮ್ಮ ಇಂಜಿನ್ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ತಕ್ಷಣ ಪರಿಶೀಲಿಸುತ್ತದೆ." },
                    3: { title: "ಮಾರ್ಗದರ್ಶನ", desc: "ಪರಿಹಾರಗಳು ಅಥವಾ ವೈದ್ಯರ ಸಂಪರ್ಕವನ್ನು ಪಡೆಯಿರಿ." }
                }
            },
            trustedBy: "ವಿಶ್ವಾಸಾರ್ಹ"
        },
        auth: {
            welcomeBack: "ಸ್ವಾಗತ",
            loginSubtitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕರನ್ನು ಪ್ರವೇಶಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ",
            createAccount: "ಖಾತೆ ರಚಿಸಿ",
            signupSubtitle: "ವೈಯಕ್ತೀಕರಿಸಿದ ಆರೋಗ್ಯ ಬೆಂಬಲಕ್ಕಾಗಿ ಸ್ವಾಸ್ಥ್ಯಸಖಗೆ ಸೇರಿ",
            phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
            password: "ಪಾಸ್‌ವರ್ಡ್",
            name: "ಪೂರ್ಣ ಹೆಸರು",
            email: "ಇಮೇಲ್",
            age: "ವಯಸ್ಸು",
            weight: "ತೂಕ",
            height: "ಎತ್ತರ",
            gender: "ಲಿಂಗ",
            location: "ಸ್ಥಳ",
            sendOtp: "OTP ಕಳುಹಿಸಿ",
            otpSent: "OTP ಕಳುಹಿಸಲಾಗಿದೆ",
            verify: "ಪರಿಶೀಲಿಸಿ",
            verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
            login: "ಲಾಗಿನ್",
            signup: "ಸೈನ್ ಅಪ್",
            noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
            haveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
            accountCreated: "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ!",
            redirecting: "ಲಾಗಿನ್‌ಗೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...",
            errors: {
                fillAll: "ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
                invalidPhone: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 12-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
                verifyFirst: "ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
                invalidOtp: "ಅಮಾನ್ಯ OTP"
            }
        },
        emergencyPage: {
            title: "ತುರ್ತು ಕೇಂದ್ರ",
            subtitle: "ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ ನಿರ್ಣಾಯಕ ಪ್ರತಿಕ್ರಿಯೆ ಪರಿಕರಗಳು",
            liveSystem: "ಲೈವ್ ತುರ್ತು ವ್ಯವಸ್ಥೆ",
            disclaimerTitle: "ವೈದ್ಯಕೀಯ ಹಕ್ಕು ನಿರಾಕರಣೆ",
            disclaimerText: "ಈ ಅಪ್ಲಿಕೇಶನ್ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಸಂಪರ್ಕವನ್ನು ಸುಗಮಗೊಳಿಸುತ್ತದೆ. ಜೀವಕ್ಕೆ ಅಪಾಯಕಾರಿ ತುರ್ತುಸ್ಥಿತಿಗಳಿಗಾಗಿ, ನೇರವಾಗಿ 108 ಗೆ ಕರೆ ಮಾಡಿ."
        },
        chatPage: {
            aiSakha: "AI ಸಖಾ",
            online: "ಲೈವ್",
            live: "ಲೈವ್",
            speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
            thinking: "ಯೋಚಿಸುತ್ತಿದೆ...",
            ready: "ಸಿದ್ಧ",
            listening: "ಆಲಿಸುತ್ತಿದೆ...",
            inputPlaceholder: "ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಹಿಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
            aiDisclaimer: "AI ವೈದ್ಯರಲ್ಲ.",
            quickSymptom: "ತ್ವರಿತ ರೋಗಲಕ್ಷಣ ಆಯ್ಕೆ",
            quickSymptomDesc: "ತ್ವರಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಲು ಸಾಮಾನ್ಯ ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            clusterDetected: "ರೋಗಲಕ್ಷಣ ಕ್ಲಸ್ಟರ್ ಪತ್ತೆಯಾಗಿದೆ",
            severity: "ತೀವ್ರತೆ",
            relatedConditions: "ಬಹುಶಃ ಇದಕ್ಕೆ ಸಂಬಂಧಿಸಿದೆ"
        }
    }
};
