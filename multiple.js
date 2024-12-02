$(document).ready(function() {
    const quizFlow = {
        start: {
            question: "1. 在社交場合中，你通常是？",
            options: [
                { text: "喜歡主導話題，充滿領導力", next: "situation", animal: "wolf" },
                { text: "善於聆聽，擅長調解", next: "challenge", animal: "dolphin" },
                { text: "安靜但觀察入微", next: "learning", animal: "cat" },
                { text: "溫和且具同理心", next: "work", animal: "elephant" },
                { text: "機智且詼諧", next: "leisure", animal: "fox" }
            ]
        },
        situation: {
            question: "2. 處理人際關係時，你偏好？",
            options: [
                { text: "直接表達想法", next: "challenge", animal: "wolf" },
                { text: "先聽取對方意見", next: "work", animal: "dolphin" },
                { text: "保持適度距離", next: "leisure", animal: "cat" },
                { text: "尋求和諧", next: "learning", animal: "elephant" },
                { text: "用幽默化解緊張", next: "learning", animal: "fox" }
            ]
        },
        challenge: {
            question: "3. 面對困難，你會？",
            options: [
                { text: "立即採取行動解決", next: "work", animal: "wolf" },
                { text: "尋求團隊支持", next: "leisure", animal: "dolphin" },
                { text: "仔細分析問題", next: "situation", animal: "cat" },
                { text: "先安撫情緒", next: "learning", animal: "elephant" },
                { text: "找創新解決方案", next: "situation", animal: "fox" }
            ]
        },
        work: {
            question: "4. 工作時，你最重視？",
            options: [
                { text: "高效率和成果", next: "leisure", animal: "wolf" },
                { text: "團隊合作", next: "learning", animal: "dolphin" },
                { text: "獨立與精確", next: "situation", animal: "cat" },
                { text: "互相關懷", next: "challenge", animal: "elephant" },
                { text: "創新思考", next: "work", animal: "fox" }
            ]
        },
        learning: {
            question: "5. 學習新事物時，你傾向於？",
            options: [
                { text: "快速掌握關鍵", next: "result", animal: "wolf" },
                { text: "與他人討論分享", next: "result", animal: "dolphin" },
                { text: "深入鑽研細節", next: "result", animal: "cat" },
                { text: "關心學習過程", next: "result", animal: "elephant" },
                { text: "尋找有趣角度", next: "result", animal: "fox" }
            ]
        },
        result: {
            type: "result"
        }
    };

    const animalResults = {
        wolf: {
            title: "狼 - 領導者型格",
            description: "你是一個天生的領導者，具有強烈的企圖心和決心。善於制定策略，並能激勵團隊朝向共同目標前進。你重視效率和成果，同時擁有保護同伴的責任感。"
        },
        dolphin: {
            title: "海豚 - 協調者型格",
            description: "你是一個善於溝通和調解的協調者。具有高度的社交智慧，能夠輕鬆處理人際關係。你重視團隊和諧，常常是朋友圈中的潤滑劑，善於聆聽並給予支持。"
        },
        cat: {
            title: "貓 - 獨立思考者",
            description: "你是一個獨立且深思熟慮的個體。喜歡獨處，但不代表不擅社交。你觀察力敏銳，思考深入，做事講求精準。常常能看穿事物的本質，是值得信賴的夥伴。"
        },
        elephant: {
            title: "大象 - 關懷型格",
            description: "你是一個極其富有同理心的人。重視家庭和朋友，願意無私地付出和支持。你的內心寬大，善於照顧他人，是大家的情感支柱。溫和且包容，但絕不軟弱。"
        },
        fox: {
            title: "狐狸 - 智慧機智型",
            description: "你是一個聰明靈活的智慧者。思維敏捷，善於找到創新的解決方案。機智幽默，在複雜的情境中能游刃有餘。你的靈活思考常常能化解困難，創造意想不到的可能。"
        }
    };

    let selectedScores = { wolf: 0, dolphin: 0, cat: 0, elephant: 0, fox: 0 };
    let answeredQuestions = 0;
    let currentQuestion = "start";

    function renderQuestion(step) {
        const questionData = quizFlow[step];
        
        if (questionData.type === "result") {
            showResult();
            return;
        }

        const questionHtml = `
            <div class="question">
                <h4>${questionData.question}</h4>
                ${questionData.options.map((option, index) => 
                    `<button class="btn btn-outline-primary btn-option w-100" 
                        data-next="${option.next}" 
                        data-animal="${option.animal}">
                        ${option.text}
                    </button>`
                ).join('')}
            </div>
        `;

        $('#questionContainer').html(questionHtml);
    }

    $(document).on('click', '.btn-option', function() {
        const animal = $(this).data('animal');
        const nextStep = $(this).data('next');

        // 記錄分數
        selectedScores[animal]++;
        answeredQuestions++;

        // 切換到下一個問題或結果
        currentQuestion = nextStep;
        renderQuestion(currentQuestion);

        // 確保至少回答4個問題
        if (answeredQuestions >= 4 && currentQuestion === "result") {
            showResult();
        }
    });

    function showResult() {
        // 找出分數最高的動物
        const maxScore = Math.max(...Object.values(selectedScores));
        const resultAnimals = Object.keys(selectedScores).filter(animal => 
            selectedScores[animal] === maxScore
        );
        const resultAnimal = resultAnimals[0]; // 取第一個

        const resultHtml = `
            <h3>${animalResults[resultAnimal].title}</h3>
            <p>${animalResults[resultAnimal].description}</p>
        `;

        $('#questionContainer').hide();
        $('#resultContent')
            .html(resultHtml)
            .addClass(`bg-${getBootstrapColor(resultAnimal)} text-white`)
            .show();
    }

    function getBootstrapColor(animal) {
        const colorMap = {
            wolf: 'dark',
            dolphin: 'info',
            cat: 'secondary',
            elephant: 'primary',
            fox: 'warning'
        };
        return colorMap[animal] || 'light';
    }

    // 初始化
    renderQuestion(currentQuestion);
});