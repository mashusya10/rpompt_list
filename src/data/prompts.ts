export interface Category {
  id: string;
  ko: string;
  en: string;
  ru: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "cat-1", ko: "보고서/기획서", en: "Reports/Planning", ru: "Отчёты/Планирование", icon: "FileText" },
  { id: "cat-2", ko: "마케팅/콘텐츠", en: "Marketing/Content", ru: "Маркетинг/Контент", icon: "Megaphone" },
  { id: "cat-3", ko: "교육/강의자료", en: "Education/Teaching", ru: "Образование/Обучение", icon: "Presentation" },
  { id: "cat-4", ko: "HR/인사", en: "HR/Recruitment", ru: "HR/Кадры", icon: "Users" },
  { id: "cat-5", ko: "제안서/영업", en: "Proposals/Sales", ru: "Предложения/Продажи", icon: "Handshake" },
  { id: "cat-6", ko: "분석/데이터", en: "Analysis/Data", ru: "Анализ/Данные", icon: "BarChart3" },
  { id: "cat-7", ko: "법무/계약", en: "Legal/Contracts", ru: "Юридические/Контракты", icon: "Gavel" },
  { id: "cat-8", ko: "IT/개발", en: "IT/Development", ru: "IT/Разработка", icon: "Code2" },
  { id: "cat-9", ko: "전략/경영", en: "Strategy/Management", ru: "Стратегия/Менеджмент", icon: "Compass" },
  { id: "cat-10", ko: "공공/행정", en: "Public/Admin", ru: "Госсектор/Админы", icon: "Building2" },
];

export interface Prompt {
  id: string;
  categoryId: string;
  tags: { ko: string; en: string; ru: string }[];
  content: { ko: string; en: string; ru: string };
  role: { ko: string; en: string; ru: string };
}

export const prompts: Prompt[] = [
  {
    id: "#001",
    categoryId: "cat-1",
    role: { ko: "기획자", en: "Planner", ru: "Планировщик" },
    tags: [{ ko: "구조화", en: "Structuring", ru: "Структурирование" }],
    content: {
      ko: "[신규 서비스 기획]에 대한 아이데이션 회의록 내용을 바탕으로, 경영진 보고용 '원페이지 기획서(One-Page Proposal)' 초안을 작성해주세요. 핵심 문제 정의, 해결 방안, 기대 효과, 소요 예산 항목을 포함하여 개조식으로 명료하게 정리해주세요.",
      en: "Based on the ideation meeting minutes for [New Service Planning], please draft a 'One-Page Proposal' for executive reporting. Clearly organize the core problem definition, solution, expected effects, and required budget in a bulleted format.",
      ru: "На основе протокола совещания по [Планированию нового сервиса] подготовьте проект «Ожидаемого предложения на одну страницу» для руководства. Четко организуйте определение основной проблемы, решение, ожидаемые эффекты и необходимый бюджет в виде маркированного списка."
    }
  },
  {
    id: "#011",
    categoryId: "cat-2",
    role: { ko: "마케터", en: "Marketer", ru: "Маркетолог" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "[2030 직장인 여성]을 타겟으로 한 [건강기능식품] 인스타그램 카드뉴스 5장 분량의 기획안을 작성해주세요. 각 장별 들어갈 카피(헤드라인/바디)와 추천 이미지 컨셉을 표로 정리해주세요.",
      en: "Create a 5-page Instagram card news plan for [Health Functional Food] targeting [Female Office Workers in 2030s]. Organize the copy (headline/body) and recommended image concepts for each page in a table.",
      ru: "Создайте план из 5 карточек для Instagram для [Функционального питания], ориентированного на [Женщин-офисных работников 2030-х годов]. Организуйте текст (заголовок/тело) и рекомендуемые концепции изображений для каждой страницы в таблице."
    }
  },
  {
    id: "#021",
    categoryId: "cat-3",
    role: { ko: "강사/교육담당", en: "Instructor/Educator", ru: "Инструктор" },
    tags: [{ ko: "구조화", en: "Structuring", ru: "Структурирование" }],
    content: {
      ko: "[신입사원 비즈니스 매너] 교육을 위한 4시간짜리 워크숍 커리큘럼을 상세하게 짜주세요. 시간대별 모듈(도입, 전개, 실습, 마무리), 주요 학습 내용, 활용할 수 있는 아이스브레이킹 게임을 포함해주세요.",
      en: "Please draft a detailed 4-hour workshop curriculum for [New Employee Business Manners] training. Include hourly modules (intro, development, practice, wrap-up), key learning content, and applicable ice-breaking games.",
      ru: "Подготовьте подробную программу 4-часового семинара по обучению [Деловому этикету новых сотрудников]. Включите почасовые модули (введение, развитие, практика, завершение), основное учебное содержание и подходящие игры для «разбивания льда»."
    }
  },
  {
    id: "#031",
    categoryId: "cat-4",
    role: { ko: "HR담당자", en: "HR Manager", ru: "HR-менеджер" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "[시니어 개발자] 채용 공고(JD)를 작성해주세요. 기술 스택 나열보다는 우리 회사의 개발 문화, 자율성, 성장 기회를 매력적으로 어필하는 '채용 브랜딩' 관점에서 작성해주세요.",
      en: "Write a job description (JD) for a [Senior Developer]. Rather than listing tech stacks, write from a 'recruitment branding' perspective that attractively appeals to our company's development culture, autonomy, and growth opportunities.",
      ru: "Напишите описание вакансии (JD) для [Старшего разработчика]. Вместо перечисления технологических стеков, пишите с точки зрения «HR-брендинга», который привлекательно подчеркивает культуру разработки нашей компании, автономию и возможности роста."
    }
  },
  {
    id: "#041",
    categoryId: "cat-5",
    role: { ko: "영업/BD", en: "Sales/BD", ru: "Продажи/BD" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "잠재 고객사([유통 대기업]) 담당자에게 보낼 [콜드 메일(Cold Email)] 초안을 작성해주세요. 제목은 클릭을 유도하도록 매력적으로, 본문은 우리 솔루션이 그들의 '물류 비용 절감' 문제를 어떻게 해결해줄 수 있는지 짧고 강렬하게 제안해주세요.",
      en: "Draft a [Cold Email] to be sent to the person in charge at a potential client ([Large Distribution Company]). Make the subject line attractive to induce clicks, and for the body, briefly and intensely suggest how our solution can solve their 'logistics cost reduction' problem.",
      ru: "Подготовьте проект [Холодного письма] для отправки ответственному лицу у потенциального клиента ([Крупная дистрибьюторская компания]). Сделайте тему письма привлекательной для кликов, а в теле письма кратко и ярко предложите, как наше решение может решить их проблему «снижения логистических затрат»."
    }
  },
  {
    id: "#051",
    categoryId: "cat-6",
    role: { ko: "데이터분석가", en: "Data Analyst", ru: "Аналитик данных" },
    tags: [{ ko: "분석", en: "Analysis", ru: "Анализ" }],
    content: {
      ko: "첨부된 CSV 데이터(매출, 날짜, 지역, 상품군)를 분석하기 위한 Python Pandas 코드를 생성해주세요. 월별 매출 추이 시각화, 지역별 베스트셀러 상품 도출, 전월 대비 성장률 계산 코드를 포함해주세요.",
      en: "Generate Python Pandas code to analyze the attached CSV data (sales, date, region, product group). Include code for monthly sales trend visualization, regional bestseller product derivation, and month-over-month growth rate calculation.",
      ru: "Сгенерируйте код Python Pandas для анализа прикрепленных данных CSV (продажи, дата, регион, группа продуктов). Включите код для визуализации ежемесячных тенденций продаж, определения региональных бестселлеров и расчета темпов роста по сравнению с предыдущим месяцем."
    }
  },
  {
    id: "#061",
    categoryId: "cat-7",
    role: { ko: "법무/행정", en: "Legal/Admin", ru: "Юрист/Админ" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "[비밀유지계약서(NDA)] 표준 양식을 작성해주세요. 정의, 비밀정보의 범위, 예외 사항, 비밀유지 의무 기간(3년), 위반 시 손해배상 조항을 포함하여 법적으로 꼼꼼한 초안을 만들어주세요.",
      en: "Please draft a standard [Non-Disclosure Agreement (NDA)] form. Create a legally thorough draft including definitions, scope of confidential information, exceptions, non-disclosure obligation period (3 years), and clauses for damages in case of violation.",
      ru: "Подготовьте стандартную форму [Соглашения о неразглашении (NDA)]. Создайте юридически тщательный проект, включающий определения, сферу конфиденциальной информации, исключения, срок обязательств по неразглашению (3 года) и пункты о возмещении убытков в случае нарушения."
    }
  },
  {
    id: "#071",
    categoryId: "cat-8",
    role: { ko: "IT개발자", en: "Developer", ru: "Разработчик" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "작성한 코드(Python)에 대한 [API 문서(Swagger 스타일)] 설명을 작성해주세요. 각 엔드포인트의 기능, 요청 파라미터, 응답 예시, 에러 코드를 포함하여 다른 개발자가 보고 연동할 수 있도록 상세히 기술해주세요.",
      en: "Write an [API documentation (Swagger style)] explanation for the written code (Python). Describe in detail including the function of each endpoint, request parameters, response examples, and error codes so that other developers can reference and integrate them.",
      ru: "Напишите пояснение к [Документации API (в стиле Swagger)] для написанного кода (Python). Подробно опишите функции каждой конечной точки, параметры запроса, примеры ответов и коды ошибок, чтобы другие разработчики могли использовать их и интегрировать."
    }
  },
  {
    id: "#081",
    categoryId: "cat-9",
    role: { ko: "CEO/임원", en: "CEO/Executive", ru: "CEO/Руководитель" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "신년사(CEO Message)를 작성해주세요. 지난 해의 위기 극복에 대한 감사, 올해의 핵심 경영 키워드('도약', '혁신'), 직원들을 향한 격려와 비전 공유를 담은 감동적이고 힘찬 연설문을 만들어주세요.",
      en: "Write a New Year's address (CEO Message). Create an emotional and powerful speech that includes gratitude for overcoming crises last year, key management keywords for this year ('leap', 'innovation'), and encouragement and vision sharing for employees.",
      ru: "Напишите новогоднее обращение (Сообщение CEO). Создайте эмоциональную и мощную речь, которая включает благодарность за преодоление кризисов прошлого года, ключевые слова управления на этот год («скачок», «инновации»), а также поддержку и обмен видением с сотрудниками."
    }
  },
  {
    id: "#091",
    categoryId: "cat-10",
    role: { ko: "공무원/행정직", en: "Public Officer", ru: "Чиновник" },
    tags: [{ ko: "문서생성", en: "Doc Gen", ru: "Создание дока" }],
    content: {
      ko: "[지역 청년 창업 지원 사업] 공모 신청서 초안을 작성해주세요. 사업의 필요성, 추진 목표, 세부 추진 계획, 기대 효과를 정부 공모 양식에 맞는 격식체로 작성하고, 심사위원의 눈길을 끌 수 있는 제목을 3가지 제안해주세요.",
      en: "Draft an application for the [Regional Youth Entrepreneurship Support Project] contest. Write the necessity of the project, promotion goals, detailed promotion plans, and expected effects in a formal style suitable for government contest forms, and suggest 3 titles that can catch the eyes of the judges.",
      ru: "Подготовьте заявку на участие в конкурсе [Региональный проект поддержки молодежного предпринимательства]. Опишите необходимость проекта, цели продвижения, подробные планы продвижения и ожидаемые эффекты в официальном стиле, подходящем для государственных форм конкурсов, и предложите 3 заголовка, которые могут привлечь внимание судей."
    }
  }
];
