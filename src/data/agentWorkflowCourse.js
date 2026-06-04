const makeAgentLesson = ({
  title,
  topic,
  concept,
  analogy,
  diagram,
  code,
  practice,
  mistakes,
  failure,
  production,
  assignment,
  checklist,
  examples,
  quiz,
  summary,
}) => ({
  title,
  topic,
  goals: [
    `${title}의 핵심 개념을 실무 언어로 설명할 수 있다.`,
    "업무 흐름을 입력, 처리, 판단, 검증, 출력 단계로 나눌 수 있다.",
    "Agent Workflow를 안전하게 운영하기 위한 검토 지점을 설계할 수 있다.",
  ],
  sections: [
    { heading: "1. 개념 설명", body: concept },
    { heading: "2. 비유", body: analogy },
    {
      heading: "3. 아키텍처 다이어그램",
      body: diagram,
      points: ["업무 요청은 입력으로 들어오고, 에이전트는 목표와 규칙을 기준으로 다음 행동을 고릅니다.", "도구 실행 결과는 다시 컨텍스트가 되고, 검증 단계를 통과한 뒤 최종 산출물로 정리됩니다."],
    },
    {
      heading: "4. 코드 예제",
      body: code,
      points: ["교육에서는 코드를 외우는 것이 아니라 입력, 처리, 검증, 출력의 경계를 읽는 데 집중합니다."],
    },
    { heading: "5. 실습", body: practice },
    {
      heading: "6. 흔한 실수",
      body: mistakes,
      points: ["목표를 크게 잡아 한 번에 모든 업무를 자동화하려고 합니다.", "사람이 승인해야 하는 지점을 정하지 않습니다.", "실패 케이스를 테스트하지 않고 정상 케이스만 확인합니다."],
    },
    { heading: "7. 실패 사례", body: failure },
    { heading: "8. 프로덕션 패턴", body: production },
    {
      heading: "9. 퀴즈",
      body: "개념을 말로 설명하는 것보다 실제 업무 흐름에 적용할 수 있는지 확인합니다.",
      points: quiz.map((item) => `Q. ${item.q} / A. ${item.a}`),
    },
    { heading: "10. 과제", body: assignment },
    {
      heading: "11. 심화 읽기",
      body: "OpenAI Agents, function calling, RAG, evaluation, guardrails 관련 공식 문서와 사례를 읽고 현재 설계에 반영할 지점을 찾습니다.",
    },
    {
      heading: "12. 실무 체크리스트",
      body: "수업 후 실제 업무에 적용하기 전 아래 항목을 점검합니다.",
      points: checklist,
    },
  ],
  comparisonTable: {
    headers: ["구분", "확인 질문", "좋은 기준"],
    rows: [
      ["입력", "필요한 정보가 충분한가?", "필수값, 선택값, 금지 입력이 구분되어 있다."],
      ["처리", "AI가 맡을 단계가 명확한가?", "생성, 분류, 검색, 계산, 검증이 분리되어 있다."],
      ["검증", "누가 무엇을 확인하는가?", "자동 검증과 사람 승인이 함께 정의되어 있다."],
      ["출력", "바로 사용할 수 있는 형태인가?", "문서, 표, 메일, 티켓 등 목적에 맞는 형식이다."],
    ],
  },
  examples,
  activity: {
    title: practice,
    steps: [
      "내 업무에서 반복되는 요청 하나를 고른다.",
      "입력, 처리, 판단, 검증, 출력 단계로 나눈다.",
      "AI에게 맡길 단계와 사람이 승인할 단계를 표시한다.",
      "정상, 예외, 위험 케이스를 각각 1개씩 만든다.",
      "실행 결과와 개선할 점을 기록한다.",
    ],
    output: `${title} 워크플로우 설계 초안`,
  },
  quiz,
  summary,
})

export const agentWorkflowLessons = [
  makeAgentLesson({
    title: "Module 0. Agent 사고와 웹 업무의 본질",
    topic: "Agent가 왜 필요한지, 일반 ChatGPT 사용과 무엇이 다른지 이해하기",
    concept: "Agent는 한 번 답변하고 끝나는 챗봇이 아니라 목표를 달성하기 위해 여러 단계를 계획하고 실행하는 업무 실행 단위입니다. 교육의 출발점은 기술 이름이 아니라 업무가 왜 반복되고 어디서 병목이 생기는지 이해하는 것입니다.",
    analogy: "ChatGPT가 한 명의 조언자라면 Agent Workflow는 업무 매뉴얼을 들고 움직이는 주니어 운영자에 가깝습니다. 단, 승인 권한과 책임은 사람에게 남아 있어야 합니다.",
    diagram: "User Request -> Agent Goal -> Plan -> Tool or LLM Step -> Verification -> Human Approval -> Output",
    code: "const workflow = ['입력 확인', '초안 생성', '근거 검토', '사람 승인', '최종 발송']",
    practice: "반복 업무 하나를 골라 Agent가 필요한 업무인지, 단순 프롬프트로 충분한 업무인지 분류합니다.",
    mistakes: "Agent라는 이름만 붙이고 실제로는 긴 프롬프트 하나로 모든 일을 처리하려는 경우가 많습니다.",
    failure: "회의록 요약 Agent가 담당자와 기한이 없는 액션아이템을 임의로 만들어내면 팀 업무가 오히려 혼란스러워집니다.",
    production: "작은 범위의 업무를 정하고, 누락 정보는 추정하지 않고 확인 필요로 표시하는 규칙을 먼저 둡니다.",
    assignment: "내 업무 3개를 Agent 적합도 기준으로 평가하고 첫 번째 파일럿 후보를 고릅니다.",
    checklist: ["반복 빈도가 높은가?", "입력과 출력이 일정한가?", "실패했을 때 영향이 감당 가능한가?", "사람 승인 지점이 있는가?"],
    examples: [
      { title: "주간 보고서 Agent", detail: "업무 메모를 받아 보고서 초안과 확인 필요 항목을 생성합니다." },
      { title: "고객 문의 Agent", detail: "문의 유형을 분류하고 답변 초안을 만들되 보상 표현은 사람이 승인합니다." },
    ],
    quiz: [
      { q: "Agent와 챗봇의 가장 큰 차이는?", a: "대화 응답을 넘어 목표 달성을 위한 여러 단계를 실행한다는 점입니다." },
      { q: "Agent 업무에서 사람이 남겨야 할 역할은?", a: "검토, 승인, 책임 판단입니다." },
    ],
    summary: ["Agent는 목표 기반 업무 실행 흐름입니다.", "처음부터 큰 자동화를 만들지 않고 작은 반복 업무에서 시작합니다.", "승인과 책임은 사람에게 남깁니다."],
  }),
  makeAgentLesson({
    title: "Module 1. Workflow Design Mastery",
    topic: "업무를 상태와 단계로 분해하고 실행 가능한 흐름으로 설계하기",
    concept: "워크플로우는 업무가 흘러가는 순서입니다. 좋은 워크플로우는 시작 조건, 입력, 처리 단계, 분기 조건, 종료 조건이 명확합니다.",
    analogy: "워크플로우는 요리 레시피와 같습니다. 재료가 빠졌을 때 어떻게 할지, 중간에 맛을 보는 시점이 언제인지까지 있어야 반복 가능한 결과가 나옵니다.",
    diagram: "Start -> Validate Input -> Classify -> Generate Draft -> Review -> Revise -> Done",
    code: "if (!input.owner) return '담당자 확인 필요';",
    practice: "업무 하나를 상태 머신처럼 그리고 정상 흐름과 예외 흐름을 분리합니다.",
    mistakes: "업무 단계를 문장으로만 설명하고 분기 조건을 쓰지 않으면 실행할 때마다 결과가 달라집니다.",
    failure: "고객 문의가 환불, 장애, 기능 요청으로 갈라져야 하는데 모두 같은 답변 생성 단계로 보내면 위험한 문안이 나옵니다.",
    production: "단계마다 입력 형식, 출력 형식, 실패 조건, 다음 단계를 표로 관리합니다.",
    assignment: "선택한 업무의 workflow map을 작성합니다.",
    checklist: ["시작 조건이 있는가?", "분기 기준이 있는가?", "종료 조건이 있는가?", "예외 처리 경로가 있는가?"],
    examples: [
      { title: "회의록 흐름", detail: "메모 입력, 결정사항 추출, 액션아이템 검증, 공유 문서 생성으로 나눕니다." },
      { title: "리서치 흐름", detail: "질문 정의, 자료 수집, 요약, 근거 검토, 보고서 작성으로 나눕니다." },
    ],
    quiz: [
      { q: "워크플로우에 종료 조건이 필요한 이유는?", a: "무한 수정과 불필요한 반복을 막기 위해서입니다." },
      { q: "분기 조건은 무엇을 기준으로 정하는가?", a: "입력 유형, 위험도, 누락 정보, 승인 필요 여부입니다." },
    ],
    summary: ["Workflow는 업무의 실행 지도입니다.", "정상 흐름보다 예외 흐름이 실무 안정성을 좌우합니다.", "단계별 입력과 출력이 명확해야 재사용됩니다."],
  }),
  makeAgentLesson({
    title: "Module 2. Prompt Chain Engineering",
    topic: "단일 프롬프트가 아니라 생성, 검토, 수정 프롬프트를 연결하기",
    concept: "Prompt Chain은 하나의 큰 요청을 여러 작은 요청으로 나누어 품질을 높이는 방식입니다. 생성 프롬프트와 검토 프롬프트를 분리하면 결과를 통제하기 쉬워집니다.",
    analogy: "글을 한 번에 완성하지 않고 초안, 리뷰, 교정, 최종본 과정을 거치는 편집실과 같습니다.",
    diagram: "Input -> Draft Prompt -> Review Prompt -> Revision Prompt -> Final Format Prompt",
    code: "const chain = [draftPrompt, reviewPrompt, revisePrompt, finalPrompt]",
    practice: "보고서 초안을 생성, 검토, 수정, 최종 정리 프롬프트 4개로 나눕니다.",
    mistakes: "프롬프트 하나에 생성, 검토, 수정, 형식 변환을 모두 넣으면 결과가 길고 불안정해집니다.",
    failure: "검토 기준 없이 생성된 제안서를 그대로 고객에게 보내 과장 표현과 확인되지 않은 수치가 포함됩니다.",
    production: "체인은 각 단계 결과를 저장하고, 실패한 단계만 다시 실행할 수 있게 설계합니다.",
    assignment: "내 업무용 프롬프트 체인 4종을 작성합니다.",
    checklist: ["생성 프롬프트와 검토 프롬프트가 분리되었는가?", "각 단계 출력 형식이 있는가?", "재실행 기준이 있는가?"],
    examples: [
      { title: "고객 메일 체인", detail: "초안 작성 후 위험 표현을 검토하고 정중한 톤으로 수정합니다." },
      { title: "보고서 체인", detail: "목차 생성, 근거 점검, 임원용 요약으로 이어집니다." },
    ],
    quiz: [
      { q: "Prompt Chain의 장점은?", a: "복잡한 업무를 작은 단계로 나누어 품질과 검토 가능성을 높입니다." },
      { q: "검토 프롬프트를 분리하는 이유는?", a: "생성과 평가 기준을 분리해 오류를 찾기 쉽게 하기 위해서입니다." },
    ],
    summary: ["Agent Workflow의 기본 단위는 프롬프트 체인입니다.", "생성, 검토, 수정, 정리를 분리합니다.", "단계별 결과를 남기면 개선이 쉬워집니다."],
  }),
  makeAgentLesson({
    title: "Module 3. Tools and Function Calling",
    topic: "Agent가 검색, 계산, DB 조회, 문서 생성 같은 도구를 쓰는 구조 이해하기",
    concept: "도구 사용은 Agent가 말만 하는 단계를 넘어 실제 시스템 기능을 호출하는 단계입니다. 어떤 도구를 언제 호출할지, 호출 결과를 어떻게 검증할지 정해야 합니다.",
    analogy: "Agent는 기획자이고 Tool은 전화, 계산기, 검색창, 업무 시스템입니다. 기획자가 아무 도구나 쓰면 위험하므로 사용 권한과 절차가 필요합니다.",
    diagram: "Agent Decision -> Tool Call -> Tool Result -> Result Check -> Next Step",
    code: "callTool('searchPolicy', { keyword: '환불 기준' })",
    practice: "내 워크플로우에서 필요한 도구 목록과 호출 조건을 정의합니다.",
    mistakes: "모든 정보를 LLM 기억에 기대고 실제 데이터 조회 도구를 연결하지 않습니다.",
    failure: "가격 정책을 기억으로 답한 Agent가 최신 요금제와 다른 안내를 고객에게 보냅니다.",
    production: "최신성, 정확성, 권한이 필요한 정보는 반드시 도구 호출이나 원본 자료 조회로 처리합니다.",
    assignment: "내 Agent가 써야 할 도구 3개와 금지 도구 3개를 정의합니다.",
    checklist: ["도구 호출 조건이 명확한가?", "권한이 필요한 도구가 분리되었는가?", "도구 결과 검증 단계가 있는가?"],
    examples: [
      { title: "정책 검색 도구", detail: "고객 응대 전 사내 정책 문서를 검색합니다." },
      { title: "일정 조회 도구", detail: "회의 준비 Agent가 캘린더 정보를 확인합니다." },
    ],
    quiz: [
      { q: "Tool Calling이 필요한 대표 상황은?", a: "최신 정보, 내부 데이터, 계산, 시스템 실행이 필요한 경우입니다." },
      { q: "도구 결과를 바로 믿으면 안 되는 이유는?", a: "조회 실패, 오래된 데이터, 권한 문제를 확인해야 하기 때문입니다." },
    ],
    summary: ["도구는 Agent의 행동 범위를 넓힙니다.", "도구 호출에는 권한과 검증이 필요합니다.", "최신 정보는 기억이 아니라 조회로 다룹니다."],
  }),
  makeAgentLesson({
    title: "Module 4. Data, Memory, Context",
    topic: "Agent가 기억해야 할 정보와 매번 입력해야 할 정보를 구분하기",
    concept: "Context는 현재 작업에 필요한 정보이고 Memory는 반복적으로 참조할 정보입니다. 모든 정보를 기억하게 하는 것이 아니라 필요한 정보만 안전하게 보관해야 합니다.",
    analogy: "Context는 오늘 회의 자료이고 Memory는 업무 매뉴얼입니다. 둘을 섞으면 오래된 회의 내용이 잘못된 규칙처럼 작동할 수 있습니다.",
    diagram: "User Input -> Short Context -> Long Memory -> Policy -> Agent Response",
    code: "const context = { task, audience, source, constraints }",
    practice: "내 Agent에 필요한 단기 컨텍스트와 장기 메모리를 구분합니다.",
    mistakes: "개인정보나 민감한 고객 정보를 메모리에 저장해 재사용하려고 합니다.",
    failure: "이전 고객의 조건이 Memory에 남아 다음 고객 제안서에 잘못 반영됩니다.",
    production: "Memory에는 일반 규칙과 선호 형식만 저장하고, 고객별 민감정보는 작업 단위로만 처리합니다.",
    assignment: "Memory에 저장해도 되는 정보와 저장하면 안 되는 정보를 표로 정리합니다.",
    checklist: ["단기 정보와 장기 규칙이 분리되었는가?", "민감정보 저장 금지 기준이 있는가?", "오래된 기억을 갱신하는 절차가 있는가?"],
    examples: [
      { title: "보고서 형식 Memory", detail: "회사 보고서 구조와 문체 규칙만 저장합니다." },
      { title: "고객별 조건 Context", detail: "고객명과 계약 조건은 작업 입력으로만 다룹니다." },
    ],
    quiz: [
      { q: "Context와 Memory의 차이는?", a: "Context는 현재 작업 정보, Memory는 반복 참조 정보입니다." },
      { q: "Memory에 넣으면 위험한 정보는?", a: "개인정보, 고객별 계약 조건, 내부 기밀입니다." },
    ],
    summary: ["Context와 Memory를 분리해야 합니다.", "Memory는 편의보다 안전이 우선입니다.", "오래된 정보 갱신 절차가 필요합니다."],
  }),
  makeAgentLesson({
    title: "Module 5. RAG Workflow",
    topic: "문서 기반 질의응답과 근거 기반 산출물 만들기",
    concept: "RAG는 외부 문서를 검색해 LLM 답변에 근거로 사용하는 방식입니다. Agent Workflow에서는 검색, 인용, 요약, 검증 단계로 나누어 설계합니다.",
    analogy: "RAG는 기억력 좋은 사람이 아니라 자료실에서 근거 문서를 찾아 요약하는 리서처에 가깝습니다.",
    diagram: "Question -> Retrieve Docs -> Select Evidence -> Generate Answer -> Cite Sources -> Review",
    code: "const evidence = retrieveDocs(question).slice(0, 5)",
    practice: "사내 FAQ나 교육 문서를 기준으로 RAG 응답 흐름을 설계합니다.",
    mistakes: "검색 결과가 없는 경우에도 LLM이 그럴듯한 답을 만들도록 방치합니다.",
    failure: "정책 문서에 없는 환불 조건을 Agent가 추정해서 고객에게 잘못 안내합니다.",
    production: "근거 문서가 없으면 답하지 않고 확인 필요로 반환합니다.",
    assignment: "문서 기반 Agent의 검색 기준, 답변 기준, 답변 불가 기준을 작성합니다.",
    checklist: ["근거 문서 범위가 정해졌는가?", "답변 불가 조건이 있는가?", "출처 표시 규칙이 있는가?"],
    examples: [
      { title: "사내 규정 Q&A", detail: "규정집에서 관련 조항을 찾아 답변합니다." },
      { title: "제품 매뉴얼 Agent", detail: "매뉴얼 근거가 있는 기능만 안내합니다." },
    ],
    quiz: [
      { q: "RAG에서 답변 불가 조건이 중요한 이유는?", a: "근거 없는 추정을 막기 위해서입니다." },
      { q: "검색 결과는 왜 검토해야 하는가?", a: "관련 없는 문서가 섞일 수 있기 때문입니다." },
    ],
    summary: ["RAG는 근거 기반 답변을 위한 구조입니다.", "검색 실패 시 답변하지 않는 규칙이 필요합니다.", "출처와 근거를 함께 관리합니다."],
  }),
  makeAgentLesson({
    title: "Module 6. Evaluation and Test Cases",
    topic: "Agent 결과를 감으로 보지 않고 테스트 케이스와 기준으로 평가하기",
    concept: "Evaluation은 Agent가 잘 작동하는지 판단하는 기준과 테스트 묶음입니다. 정상 케이스, 예외 케이스, 위험 케이스를 반복 실행해야 합니다.",
    analogy: "Agent 평가는 시험지가 있는 채점입니다. 마음에 드는 답변 하나가 아니라 여러 문제에서 안정적으로 맞는지 봐야 합니다.",
    diagram: "Test Set -> Run Workflow -> Score Output -> Error Type -> Improve Prompt or Tool",
    code: "const score = check(output, ['정확성', '누락', '보안', '형식'])",
    practice: "내 Agent용 테스트 케이스 10개와 평가 기준표를 만듭니다.",
    mistakes: "성공한 예시 하나만 보고 실제 업무에 바로 적용합니다.",
    failure: "정상 문의는 잘 답하지만 화난 고객 문의에서 부적절한 보상 약속을 생성합니다.",
    production: "새 프롬프트나 도구를 배포하기 전 고정 테스트 세트를 다시 실행합니다.",
    assignment: "정상 5개, 예외 3개, 위험 2개 테스트 케이스를 작성합니다.",
    checklist: ["정상, 예외, 위험 케이스가 모두 있는가?", "점수 기준이 명확한가?", "개선 전후 비교가 가능한가?"],
    examples: [
      { title: "회의록 테스트", detail: "담당자가 없는 메모에서 확인 필요 표시가 되는지 봅니다." },
      { title: "고객 응대 테스트", detail: "환불 요구에서 정책 외 약속을 하지 않는지 봅니다." },
    ],
    quiz: [
      { q: "테스트 케이스를 여러 유형으로 나누는 이유는?", a: "실제 업무에는 정상 입력만 들어오지 않기 때문입니다." },
      { q: "평가 기준이 없으면 생기는 문제는?", a: "좋아 보이는 결과와 안전한 결과를 구분하기 어렵습니다." },
    ],
    summary: ["Agent는 테스트로 신뢰를 쌓습니다.", "예외와 위험 케이스가 중요합니다.", "개선 전후 결과를 비교해야 합니다."],
  }),
  makeAgentLesson({
    title: "Module 7. Guardrails and Human Approval",
    topic: "보안, 금지 행동, 사람 승인 단계를 워크플로우에 넣기",
    concept: "Guardrail은 Agent가 하지 말아야 할 행동을 막는 안전장치입니다. 입력 필터, 출력 검토, 권한 제한, 사람 승인 단계가 포함됩니다.",
    analogy: "Guardrail은 자동차의 브레이크와 차선입니다. 빨리 가는 것보다 벗어나지 않는 것이 먼저입니다.",
    diagram: "Input Filter -> Agent Step -> Policy Check -> Risk Score -> Human Approval -> Output",
    code: "if (risk === 'high') return requestHumanApproval(output)",
    practice: "내 Agent의 금지 입력, 금지 출력, 승인 필요 조건을 정의합니다.",
    mistakes: "안전 문구를 프롬프트 마지막에 한 줄 넣는 것으로 충분하다고 생각합니다.",
    failure: "Agent가 고객 개인정보가 포함된 원문을 요약 결과에 그대로 노출합니다.",
    production: "고위험 주제는 자동 발송하지 않고 승인 대기 상태로 넘깁니다.",
    assignment: "Agent 사용 정책과 승인 플로우를 1페이지로 작성합니다.",
    checklist: ["금지 입력이 정의되었는가?", "자동 발송 금지 기준이 있는가?", "승인 책임자가 정해졌는가?"],
    examples: [
      { title: "고객 메일 승인", detail: "보상, 계약, 환불 표현은 담당자 승인 후 발송합니다." },
      { title: "개인정보 필터", detail: "전화번호, 주민번호, 계좌번호를 감지하면 중단합니다." },
    ],
    quiz: [
      { q: "Guardrail의 목적은?", a: "부적절한 입력, 출력, 실행을 막는 것입니다." },
      { q: "Human Approval이 필요한 경우는?", a: "고객 영향, 법률/금전/보안 리스크가 있는 경우입니다." },
    ],
    summary: ["Guardrail은 선택이 아니라 운영 조건입니다.", "고위험 결과는 사람 승인이 필요합니다.", "정책은 프롬프트 밖의 흐름에도 있어야 합니다."],
  }),
  makeAgentLesson({
    title: "Module 8. Agent UX and Operations",
    topic: "사용자가 Agent를 믿고 반복 사용할 수 있는 화면과 운영 방식 설계하기",
    concept: "Agent UX는 사용자가 입력해야 할 정보, 진행 상태, 검토 결과, 수정 요청을 이해하기 쉽게 만드는 일입니다.",
    analogy: "좋은 Agent UX는 자동판매기보다 접수창구에 가깝습니다. 무엇을 넣어야 하는지, 지금 어디까지 처리됐는지, 무엇을 확인해야 하는지 알려줍니다.",
    diagram: "Form Input -> Progress State -> Draft Preview -> Review Notes -> Approve or Revise",
    code: "const status = ['입력 대기', '처리 중', '검토 필요', '승인 완료']",
    practice: "Agent 사용 화면에 필요한 입력 필드와 상태 표시를 설계합니다.",
    mistakes: "채팅창 하나만 제공해 사용자가 매번 같은 설명을 반복하게 만듭니다.",
    failure: "결과는 생성되지만 어떤 근거와 단계로 나온 것인지 몰라 사용자가 신뢰하지 못합니다.",
    production: "자주 쓰는 업무는 폼, 템플릿, 진행 상태, 검토 로그를 제공합니다.",
    assignment: "내 Agent의 사용자 화면 와이어프레임을 텍스트로 작성합니다.",
    checklist: ["필수 입력 필드가 명확한가?", "진행 상태가 보이는가?", "수정 요청 경로가 있는가?"],
    examples: [
      { title: "보고서 Agent 화면", detail: "목적, 독자, 원본 메모, 출력 형식을 입력받습니다." },
      { title: "리서치 Agent 화면", detail: "질문, 범위, 금지 출처, 출력 길이를 입력받습니다." },
    ],
    quiz: [
      { q: "Agent UX에서 상태 표시가 중요한 이유는?", a: "사용자가 결과를 기다리고 검토할 준비를 할 수 있기 때문입니다." },
      { q: "채팅창만으로 부족한 경우는?", a: "반복 업무에서 입력 항목이 일정하고 검토 로그가 필요한 경우입니다." },
    ],
    summary: ["Agent는 사용 흐름까지 설계해야 합니다.", "반복 업무는 폼과 템플릿이 좋습니다.", "진행 상태와 검토 로그가 신뢰를 만듭니다."],
  }),
  makeAgentLesson({
    title: "Module 9. Cost, Latency, Reliability",
    topic: "토큰 비용, 응답 속도, 실패 복구까지 고려한 운영 설계",
    concept: "Agent는 여러 단계를 실행하므로 단일 질문보다 비용과 지연 시간이 커질 수 있습니다. 캐싱, 단계 축소, 모델 선택, 재시도 정책이 필요합니다.",
    analogy: "배달 동선처럼 Agent도 들르는 곳이 많을수록 시간과 비용이 늘어납니다. 꼭 필요한 경유지만 남겨야 합니다.",
    diagram: "Request -> Cheap Classifier -> Needed Steps Only -> Cache -> Retry or Fallback",
    code: "if (cachedResult) return cachedResult;",
    practice: "내 워크플로우에서 비용이 큰 단계와 줄일 수 있는 단계를 표시합니다.",
    mistakes: "모든 단계에 가장 비싼 모델을 쓰고 전체 원문을 매번 다시 보냅니다.",
    failure: "문서 전체를 매번 입력해 토큰 비용이 폭증하고 사용자가 응답을 기다리다 이탈합니다.",
    production: "분류는 가벼운 모델, 최종 작성은 강한 모델처럼 단계별 모델 전략을 둡니다.",
    assignment: "Agent 비용 절감 계획과 실패 복구 정책을 작성합니다.",
    checklist: ["단계별 모델 선택이 있는가?", "캐싱 가능한 결과가 있는가?", "재시도와 fallback이 있는가?"],
    examples: [
      { title: "요약 캐시", detail: "같은 문서 요약은 저장해 반복 비용을 줄입니다." },
      { title: "단계별 모델", detail: "단순 분류와 최종 보고서 작성에 다른 모델을 씁니다." },
    ],
    quiz: [
      { q: "Agent 비용이 커지기 쉬운 이유는?", a: "여러 단계와 도구 호출이 반복되기 때문입니다." },
      { q: "캐싱이 유용한 경우는?", a: "같은 입력이나 문서를 반복 처리하는 경우입니다." },
    ],
    summary: ["Agent 운영은 비용과 속도를 함께 봐야 합니다.", "단계별 모델 선택이 중요합니다.", "실패 복구 정책이 있어야 현업에서 쓸 수 있습니다."],
  }),
  makeAgentLesson({
    title: "Module 10. Team Workflow and Governance",
    topic: "개인 Agent를 팀 운영 프로세스로 확장하기",
    concept: "팀 단위 Agent는 개인 편의 도구가 아니라 역할, 권한, 로그, 승인, 교육이 포함된 운영 체계입니다.",
    analogy: "개인 메모장을 팀 업무 시스템으로 바꾸려면 폴더 규칙, 접근 권한, 책임자, 변경 이력이 필요합니다.",
    diagram: "User Role -> Permission -> Agent Workflow -> Log -> Review -> Policy Update",
    code: "const permissions = { viewer: ['read'], editor: ['run'], admin: ['approve'] }",
    practice: "팀에서 사용할 Agent의 역할별 권한과 운영 규칙을 설계합니다.",
    mistakes: "개인이 만든 프롬프트를 검증 없이 팀 전체에 공유합니다.",
    failure: "부서마다 다른 버전의 고객 응대 Agent를 사용해 답변 품질과 정책 준수가 흔들립니다.",
    production: "검증된 템플릿 저장소와 변경 승인 절차를 운영합니다.",
    assignment: "팀 Agent 운영 정책, 권한, 로그, 교육 계획을 작성합니다.",
    checklist: ["역할별 권한이 있는가?", "변경 이력이 남는가?", "교육과 FAQ가 있는가?"],
    examples: [
      { title: "프롬프트 저장소", detail: "검증된 프롬프트만 팀 공용으로 등록합니다." },
      { title: "승인 로그", detail: "고객 발송 결과는 승인자와 수정 이력을 남깁니다." },
    ],
    quiz: [
      { q: "팀 Agent에 권한 관리가 필요한 이유는?", a: "실행 범위와 책임을 구분하기 위해서입니다." },
      { q: "프롬프트 변경 이력이 중요한 이유는?", a: "품질 저하나 사고 발생 시 원인을 추적하기 위해서입니다." },
    ],
    summary: ["팀 Agent는 운영 체계가 필요합니다.", "권한, 로그, 승인, 교육을 함께 설계합니다.", "검증된 템플릿만 확산합니다."],
  }),
  makeAgentLesson({
    title: "Module 11. Capstone Agent Workflow Project",
    topic: "실제 업무 하나를 Agent Workflow로 설계하고 발표하기",
    concept: "마지막 단계에서는 문제 정의, 워크플로우, 프롬프트 체인, 도구, 평가, 가드레일, 운영 계획을 하나의 프로젝트 패키지로 완성합니다.",
    analogy: "건축 설계도, 시공 계획, 안전 점검표를 묶어 실제로 사용할 수 있는 작은 건물을 만드는 단계입니다.",
    diagram: "Problem -> Workflow -> Prompt Chain -> Tools -> Evaluation -> Guardrails -> Launch Plan",
    code: "export const agentProject = { problem, workflow, prompts, tools, tests, policy }",
    practice: "개인 또는 팀 업무 하나를 선택해 Agent Workflow 프로젝트를 완성합니다.",
    mistakes: "프로젝트 발표가 아이디어 소개로 끝나고 테스트 결과와 개선 로그가 없습니다.",
    failure: "실제 샘플 입력으로 검증하지 않은 Agent는 현업 적용 첫날 바로 예외 케이스에서 멈춥니다.",
    production: "최종 산출물은 다른 사람이 그대로 실행하고 검토할 수 있는 패키지여야 합니다.",
    assignment: "Agent Workflow 프로젝트 패키지를 제출하고 5분 발표를 준비합니다.",
    checklist: ["문제 정의가 측정 가능한가?", "워크플로우와 프롬프트 체인이 있는가?", "테스트 로그가 있는가?", "가드레일과 운영 계획이 있는가?"],
    examples: [
      { title: "AI Meeting Agent", detail: "회의 메모를 회의록, 액션아이템, 후속 메일 초안으로 변환합니다." },
      { title: "AI Research Agent", detail: "질문을 기준으로 자료를 찾고 근거 기반 보고서 초안을 만듭니다." },
    ],
    quiz: [
      { q: "최종 프로젝트에 테스트 로그가 필요한 이유는?", a: "반복 사용 가능성과 개선 근거를 보여주기 위해서입니다." },
      { q: "발표에서 가장 중요한 내용은?", a: "문제, 설계, 테스트 결과, 리스크 대응, 적용 계획입니다." },
    ],
    summary: ["Capstone은 실제 적용 가능한 패키지를 만드는 단계입니다.", "아이디어보다 테스트와 운영 계획이 중요합니다.", "작게 출시하고 사용 기록으로 개선합니다."],
  }),
]

const makeModule0OutlineLesson = ({ title, topic, goals, sections, tableRows, examples, activity, quiz, summary, checklist }) => ({
  title,
  topic,
  goals,
  sections: [
    ...sections,
    {
      heading: "실습",
      body: activity.title,
      points: activity.steps,
    },
    {
      heading: "프로덕션 패턴",
      body: "실무에서는 개념을 외우는 것보다 브라우저, 네트워크, 상태, 저장소가 어떤 책임을 갖는지 분리해서 보는 습관이 중요하다.",
    },
    {
      heading: "실무 체크리스트",
      body: "다음 항목을 스스로 확인한다.",
      points: checklist,
    },
  ],
  comparisonTable: {
    headers: ["항목", "핵심 질문", "실무 기준"],
    rows: tableRows,
  },
  examples,
  activity,
  quiz,
  summary,
})

const module0Lessons = [
  {
    title: "Lesson 0-1 웹사이트와 웹 애플리케이션",
    topic: "웹사이트와 웹앱의 차이를 이해하고, 서비스 목적에 따라 적절한 구조를 선택하기",
    goals: ["웹사이트와 웹앱의 차이를 설명할 수 있다.", "서비스의 목적에 따라 적절한 구조를 선택할 수 있다.", "데이터 저장이 왜 필요한지 이해할 수 있다."],
    sections: [
      {
        heading: "왜 배우는가",
        body:
          "많은 초보 개발자는 모든 웹 서비스를 동일하게 생각한다. 하지만 실제로는 회사 홈페이지, 블로그, 쇼핑몰, Gmail, Notion은 서로 다른 목적을 가진 시스템이다. 웹사이트와 웹앱을 구분하지 못하면 React, Database, Backend를 배우는 이유도 이해하기 어렵다.",
      },
      {
        heading: "웹사이트란",
        body: "주요 목적은 정보 제공이다. 예시는 블로그, 뉴스 사이트, 회사 홈페이지, 포트폴리오다.",
        points: ["구조: 사용자 -> 콘텐츠 조회 -> 페이지 읽기", "사용자는 주로 읽기만 한다."],
      },
      {
        heading: "웹 애플리케이션이란",
        body: "주요 목적은 사용자 행동 처리다. 예시는 Gmail, Slack, Notion, Figma, Google Docs다.",
        points: ["구조: 사용자 입력 -> 상태 변경 -> 저장 -> 재표시"],
      },
      {
        heading: "사고 실험",
        body: "만약 Gmail에 데이터베이스가 없다면 메일을 저장할 수 없고, 로그인도 유지할 수 없고, 읽음 상태도 기록할 수 없다. 즉 웹앱은 상태 저장 시스템이다.",
      },
      {
        heading: "실습 1",
        body: "다음 서비스를 웹사이트, 웹앱, 하이브리드로 분류해보자.",
        points: ["YouTube: 하이브리드", "Netflix: 웹앱", "Naver Blog: 웹사이트", "Notion: 웹앱", "Google Docs: 웹앱", "해설: YouTube는 콘텐츠 소비가 중심이지만 댓글, 구독, 재생목록 기능도 있어 하이브리드 형태이다."],
      },
      {
        heading: "흔한 오해",
        body: "오해 1: 웹앱 = React. 아니다. React는 UI를 만드는 도구일 뿐이다. 웹앱의 본질은 사용자 행동을 처리하는 시스템이다. 오해 2: 웹사이트는 Backend가 필요 없다. 회원가입, 댓글, 좋아요, 검색 기능이 들어가면 Backend가 필요하다.",
      },
      {
        heading: "실패 사례",
        body: "스타트업 A는 공지사항 사이트 하나를 만들기 위해 React, Redux, Kubernetes, Microservice를 도입했다. 결과적으로 개발 속도 감소, 유지보수 비용 증가, 장애 발생이 생겼다. 교훈은 문제 크기에 맞는 기술을 사용하라는 것이다.",
      },
      {
        heading: "프로덕션 패턴",
        body: "실무에서는 콘텐츠 중심이면 웹사이트, 사용자 행동 중심이면 웹앱으로 판단한다.",
      },
      {
        heading: "과제",
        body: "자주 사용하는 서비스 10개를 조사하고 웹사이트, 웹앱, 하이브리드로 분류하라.",
      },
      {
        heading: "실무 체크리스트",
        body: "서비스를 만들기 전에 아래 항목을 확인한다.",
        points: ["정보 제공이 핵심인가", "사용자 행동이 핵심인가", "로그인 필요한가", "데이터 저장 필요한가", "DB 필요한가"],
      },
    ],
    comparisonTable: {
      headers: ["항목", "웹사이트", "웹앱"],
      rows: [
        ["목적", "정보 제공", "행동 처리"],
        ["데이터 변경", "거의 없음", "매우 많음"],
        ["로그인", "선택", "거의 필수"],
        ["DB", "없어도 가능", "거의 필수"],
        ["예시", "블로그", "Gmail"],
      ],
    },
    examples: [
      { title: "블로그", detail: "주요 목적이 정보 제공이면 웹사이트에 가깝다." },
      { title: "Gmail", detail: "메일 작성, 저장, 검색, 읽음 상태 변경이 있으므로 웹앱이다." },
    ],
    activity: {
      title: "자주 사용하는 서비스 10개 분류하기",
      steps: ["서비스 10개를 적는다.", "각 서비스의 핵심 목적이 정보 제공인지 행동 처리인지 판단한다.", "웹사이트, 웹앱, 하이브리드로 분류한다.", "데이터 저장과 로그인 필요 여부를 함께 표시한다."],
      output: "웹사이트/웹앱/하이브리드 분류표",
    },
    quiz: [
      { q: "블로그는 웹사이트인가 웹앱인가?", a: "웹사이트. 주요 목적이 정보 제공이기 때문이다." },
      { q: "Gmail이 데이터베이스 없이 동작 가능한가?", a: "불가능하다. 메일 저장, 검색, 읽음 상태 기록이 불가능해진다." },
      { q: "웹앱의 핵심 특징은 무엇인가?", a: "사용자의 행동에 따라 상태가 변경되는 것이다." },
    ],
    summary: ["웹사이트의 주요 목적은 정보 제공이다.", "웹앱의 주요 목적은 사용자 행동 처리다.", "웹앱은 상태 저장 시스템이다.", "문제 크기에 맞는 기술을 선택해야 한다."],
  },
  {
    title: "Lesson 0-2 클라이언트-서버 모델",
    topic: "클라이언트와 서버를 구분하고 요청과 응답의 흐름 이해하기",
    goals: ["클라이언트와 서버를 구분할 수 있다.", "요청과 응답의 흐름을 이해한다.", "브라우저와 서버의 역할을 설명할 수 있다."],
    sections: [
      {
        heading: "현실 세계 비유",
        body: "식당에서는 손님이 주문하고 주방이 음식을 만든다. 웹에서는 브라우저가 요청(Request)을 보내고 서버가 응답(Response)을 반환한다.",
        points: ["식당: 손님 -> 주문 -> 주방 -> 음식", "웹: 브라우저 -> 요청(Request) -> 서버 -> 응답(Response)"],
      },
      {
        heading: "클라이언트란",
        body: "클라이언트는 사용자 가까이에 있는 프로그램이다.",
        points: ["Chrome", "Safari", "Edge", "모바일 앱"],
      },
      {
        heading: "서버란",
        body: "서버는 요청을 처리하는 프로그램이다.",
        points: ["Node.js", "Spring", "Django", "FastAPI"],
      },
      {
        heading: "요청과 응답",
        body: "사용자가 https://google.com 에 접속하면 브라우저는 서버로 GET / 요청을 보낸다. 서버는 HTML 같은 응답을 반환한다.",
        points: ["요청 예시: GET /", "응답 예시: <h1>Hello</h1>"],
      },
      {
        heading: "아키텍처 다이어그램",
        body: "Browser -> Request -> Server -> Query -> Database",
      },
      {
        heading: "실습",
        body: "Chrome DevTools를 실행하고 Network 탭을 연 뒤 naver.com에 접속한다.",
        points: ["Request URL", "Status Code", "Response Headers", "Response Body"],
      },
      {
        heading: "실패 사례",
        body: "초보 개발자가 const DB_PASSWORD = \"1234\"; 같은 비밀정보를 프론트엔드 코드에 작성하면 사용자가 개발자도구에서 확인할 수 있다.",
      },
      {
        heading: "프로덕션 패턴",
        body: "실무에서는 보통 Frontend -> Backend API -> Database의 3계층 구조를 사용한다.",
      },
      {
        heading: "과제",
        body: "자신이 자주 사용하는 웹서비스 하나를 선택하고 클라이언트, 서버, 데이터베이스가 각각 어떤 역할을 하는지 분석하라.",
      },
      {
        heading: "실무 체크리스트",
        body: "서비스를 만들거나 분석할 때 아래 항목을 확인한다.",
        points: ["API Key를 프론트에 두지 않았는가", "DB Password를 노출하지 않았는가", "요청(Request)과 응답(Response)을 이해했는가", "Network 탭을 사용할 수 있는가"],
      },
    ],
    comparisonTable: {
      headers: ["구성 요소", "역할", "예시"],
      rows: [
        ["클라이언트", "사용자 요청을 서버에 전달하고 응답을 화면에 보여준다.", "Chrome, Safari, Edge, 모바일 앱"],
        ["서버", "요청을 처리하고 필요한 데이터를 조회해 응답한다.", "Node.js, Spring, Django, FastAPI"],
        ["데이터베이스", "데이터를 저장하고 조회한다.", "회원 정보, 메일, 게시글, 읽음 상태"],
      ],
    },
    examples: [
      { title: "google.com 접속", detail: "브라우저가 서버에 GET 요청을 보내고 서버는 HTML 응답을 반환한다." },
      { title: "DB 비밀번호 노출", detail: "프론트엔드 코드에 비밀정보를 쓰면 사용자가 개발자도구로 확인할 수 있다." },
    ],
    activity: {
      title: "Network 탭으로 요청과 응답 관찰하기",
      steps: ["Chrome DevTools를 연다.", "Network 탭을 선택한다.", "naver.com에 접속한다.", "Request URL, Status Code, Response Headers, Response Body를 확인한다."],
      output: "웹 요청 분석 리포트",
    },
    quiz: [
      { q: "브라우저는 클라이언트인가 서버인가?", a: "클라이언트. 사용자의 요청을 서버에 전달하는 역할을 수행한다." },
      { q: "데이터베이스에 직접 접근하는 것은 누구인가?", a: "서버. 보안을 위해 브라우저는 DB에 직접 접근하지 않는다." },
      { q: "왜 비밀정보를 프론트엔드에 두면 안 되는가?", a: "사용자가 소스코드를 볼 수 있기 때문이다. API Key, JWT Secret, DB Password는 반드시 서버 환경변수에 저장해야 한다." },
    ],
    summary: ["클라이언트는 사용자 가까이에 있는 프로그램이다.", "서버는 요청을 처리하는 프로그램이다.", "웹은 요청과 응답의 흐름으로 동작한다.", "비밀정보는 프론트엔드에 두면 안 된다.", "실무에서는 Frontend, Backend API, Database의 3계층 구조를 많이 사용한다."],
  },
  makeModule0OutlineLesson({
    title: "Lesson 0-3 브라우저 내부 동작",
    topic: "HTML, CSS, JavaScript가 브라우저 안에서 화면으로 그려지는 과정 이해하기",
    goals: ["HTML Parser와 CSS Parser의 역할을 설명할 수 있다.", "Render Tree, Layout, Paint 흐름을 말할 수 있다.", "화면 렌더링이 느려지는 원인을 추적할 수 있다."],
    sections: [
      {
        heading: "왜 배우는가",
        body: "웹 개발자는 브라우저가 코드를 어떻게 해석하는지 알아야 한다. HTML, CSS, JavaScript를 작성해도 최종적으로 사용자가 보는 것은 브라우저가 만든 화면이다.",
      },
      {
        heading: "렌더링 흐름",
        body: "브라우저는 HTML을 파싱해 DOM을 만들고, CSS를 파싱해 CSSOM을 만든다. 둘을 결합해 Render Tree를 만들고 Layout으로 위치와 크기를 계산한 뒤 Paint로 픽셀을 그린다.",
        points: ["HTML Parser -> DOM", "CSS Parser -> CSSOM", "DOM + CSSOM -> Render Tree", "Layout -> Paint"],
      },
      {
        heading: "흔한 실수",
        body: "DOM을 과도하게 변경하거나 큰 이미지를 최적화하지 않으면 Layout과 Paint 비용이 커져 화면이 느려진다.",
      },
    ],
    tableRows: [
      ["HTML Parser", "문서 구조를 만드는가?", "DOM 트리를 만든다."],
      ["CSS Parser", "스타일 규칙을 해석하는가?", "CSSOM을 만든다."],
      ["Layout", "위치와 크기를 계산하는가?", "요소 배치 비용을 줄인다."],
      ["Paint", "픽셀을 그리는가?", "불필요한 다시 그리기를 줄인다."],
    ],
    examples: [
      { title: "큰 이미지", detail: "이미지 크기를 줄이지 않으면 다운로드와 Paint가 느려진다." },
      { title: "DOM 반복 수정", detail: "반복문 안에서 DOM을 계속 바꾸면 Layout 비용이 커질 수 있다." },
    ],
    activity: {
      title: "간단한 HTML 페이지를 열고 DevTools Performance로 렌더링 흐름을 관찰한다.",
      steps: ["HTML 파일을 브라우저에서 연다.", "DevTools Performance 탭에서 녹화를 시작한다.", "페이지를 새로고침한다.", "Layout과 Paint 이벤트를 찾는다."],
      output: "브라우저 렌더링 관찰 메모",
    },
    quiz: [
      { q: "DOM은 무엇을 표현하는가?", a: "HTML 문서의 구조를 트리 형태로 표현한다." },
      { q: "Layout 단계에서는 무엇을 계산하는가?", a: "요소의 위치와 크기를 계산한다." },
    ],
    summary: ["브라우저는 HTML과 CSS를 파싱해 화면을 만든다.", "Render Tree, Layout, Paint 흐름을 이해하면 성능 문제를 찾기 쉽다.", "불필요한 DOM 변경은 렌더링 비용을 키운다."],
    checklist: ["DOM과 CSSOM을 구분할 수 있는가", "Layout과 Paint를 설명할 수 있는가", "Performance 탭에서 렌더링 이벤트를 찾을 수 있는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-4 HTTP 이해",
    topic: "GET, POST, PUT, DELETE 요청의 의미와 사용 기준 이해하기",
    goals: ["HTTP 요청과 응답의 기본 구조를 설명할 수 있다.", "GET, POST, PUT, DELETE의 차이를 구분할 수 있다.", "업무 기능에 맞는 HTTP 메서드를 선택할 수 있다."],
    sections: [
      {
        heading: "HTTP란",
        body: "HTTP는 클라이언트와 서버가 요청과 응답을 주고받기 위한 약속이다. 브라우저는 HTTP 요청을 보내고 서버는 상태 코드, 헤더, 본문을 담아 응답한다.",
      },
      {
        heading: "주요 메서드",
        body: "GET은 조회, POST는 생성, PUT은 전체 수정, DELETE는 삭제에 주로 사용한다.",
        points: ["GET /posts", "POST /posts", "PUT /posts/1", "DELETE /posts/1"],
      },
      {
        heading: "흔한 실수",
        body: "데이터를 삭제하는 기능을 GET으로 만들면 링크 클릭이나 봇 접근만으로 데이터가 바뀔 수 있어 위험하다.",
      },
    ],
    tableRows: [
      ["GET", "데이터를 조회하는가?", "서버 상태를 바꾸지 않는다."],
      ["POST", "새 데이터를 만드는가?", "본문에 생성 정보를 담는다."],
      ["PUT", "기존 데이터를 수정하는가?", "대상 리소스를 명확히 한다."],
      ["DELETE", "데이터를 삭제하는가?", "삭제 권한과 확인 절차를 둔다."],
    ],
    examples: [
      { title: "게시글 목록 조회", detail: "GET /posts로 조회한다." },
      { title: "새 댓글 작성", detail: "POST /comments로 생성한다." },
    ],
    activity: {
      title: "Network 탭에서 요청 메서드와 상태 코드를 확인한다.",
      steps: ["웹사이트에 접속한다.", "Network 탭을 연다.", "요청의 Method와 Status Code를 확인한다.", "GET과 POST 요청을 찾아 비교한다."],
      output: "HTTP 요청 분석표",
    },
    quiz: [
      { q: "데이터 조회에 주로 쓰는 메서드는?", a: "GET" },
      { q: "새 데이터를 만들 때 주로 쓰는 메서드는?", a: "POST" },
    ],
    summary: ["HTTP는 웹의 요청/응답 약속이다.", "메서드는 요청의 의도를 표현한다.", "상태를 바꾸는 요청은 신중하게 설계해야 한다."],
    checklist: ["GET과 POST를 구분할 수 있는가", "Status Code를 확인할 수 있는가", "데이터 변경 요청에 적절한 메서드를 쓰는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-5 상태(State)란 무엇인가",
    topic: "Todo 예시로 상태가 무엇이고 왜 웹앱의 핵심인지 이해하기",
    goals: ["상태의 의미를 설명할 수 있다.", "Todo 앱에서 상태 변경을 추적할 수 있다.", "UI와 데이터 상태의 관계를 이해할 수 있다."],
    sections: [
      {
        heading: "상태란",
        body: "상태는 지금 시스템이 기억하고 있는 값이다. Todo 앱에서는 할 일 목록, 완료 여부, 필터, 입력창 값이 모두 상태다.",
      },
      {
        heading: "Todo 예시",
        body: "사용자가 할 일을 추가하면 목록 상태가 바뀐다. 체크박스를 누르면 완료 상태가 바뀐다. 필터를 바꾸면 화면에 보이는 목록이 달라진다.",
        points: ["입력값", "할 일 목록", "완료 여부", "필터 조건"],
      },
      {
        heading: "흔한 실수",
        body: "화면에 보이는 값과 실제 데이터 상태를 분리해서 생각하지 않으면 버그를 찾기 어렵다.",
      },
    ],
    tableRows: [
      ["입력 상태", "사용자가 무엇을 입력 중인가?", "폼 값으로 관리한다."],
      ["데이터 상태", "저장된 데이터는 무엇인가?", "목록과 객체로 관리한다."],
      ["UI 상태", "화면은 어떤 모드인가?", "열림, 닫힘, 로딩, 선택 상태를 관리한다."],
    ],
    examples: [
      { title: "Todo 완료", detail: "체크박스를 누르면 completed 값이 false에서 true로 바뀐다." },
      { title: "검색어 입력", detail: "입력창 값이 바뀌면 화면에 보이는 결과가 달라진다." },
    ],
    activity: {
      title: "Todo 앱의 상태 목록을 작성한다.",
      steps: ["Todo 앱 화면을 상상한다.", "사용자가 바꿀 수 있는 값을 모두 적는다.", "각 값이 입력, 데이터, UI 상태 중 무엇인지 분류한다."],
      output: "Todo 상태 분류표",
    },
    quiz: [
      { q: "상태란 무엇인가?", a: "시스템이 현재 기억하고 있는 값이다." },
      { q: "Todo에서 완료 여부는 상태인가?", a: "그렇다. 사용자 행동에 따라 바뀌는 값이다." },
    ],
    summary: ["상태는 웹앱의 핵심이다.", "사용자 행동은 상태를 바꾼다.", "UI는 상태를 바탕으로 다시 그려진다."],
    checklist: ["상태와 화면을 구분할 수 있는가", "사용자 행동이 바꾸는 값을 찾을 수 있는가", "입력/데이터/UI 상태를 분류할 수 있는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-6 왜 웹앱은 상태 머신인가",
    topic: "웹앱을 상태와 전이의 관점으로 이해하기",
    goals: ["상태 머신의 기본 개념을 설명할 수 있다.", "웹앱 화면을 상태와 이벤트로 나눌 수 있다.", "예외 상태를 설계할 수 있다."],
    sections: [
      {
        heading: "상태 머신이란",
        body: "상태 머신은 시스템이 가질 수 있는 상태와 상태를 바꾸는 이벤트를 정의한 모델이다. 웹앱은 로그인 전, 로딩 중, 성공, 실패 같은 상태를 오가며 동작한다.",
      },
      {
        heading: "웹앱 상태 예시",
        body: "로그인 화면은 idle, submitting, success, error 상태를 가질 수 있다. 버튼 클릭이나 서버 응답은 상태를 바꾸는 이벤트다.",
        points: ["idle -> submitting", "submitting -> success", "submitting -> error"],
      },
      {
        heading: "흔한 실수",
        body: "로딩과 에러 상태를 설계하지 않으면 사용자는 앱이 멈춘 것처럼 느낀다.",
      },
    ],
    tableRows: [
      ["상태", "지금 어떤 상황인가?", "idle, loading, success, error로 표현한다."],
      ["이벤트", "무엇이 상태를 바꾸는가?", "클릭, 입력, 서버 응답이다."],
      ["전이", "어떤 상태로 이동하는가?", "불가능한 이동을 막는다."],
    ],
    examples: [
      { title: "로그인", detail: "제출 전, 제출 중, 성공, 실패 상태를 가진다." },
      { title: "파일 업로드", detail: "대기, 업로드 중, 완료, 실패 상태를 가진다." },
    ],
    activity: {
      title: "로그인 화면을 상태 머신으로 그린다.",
      steps: ["로그인 화면의 가능한 상태를 적는다.", "각 상태를 바꾸는 이벤트를 적는다.", "불가능한 상태 전이를 찾는다."],
      output: "로그인 상태 머신 다이어그램",
    },
    quiz: [
      { q: "상태 전이를 일으키는 것은?", a: "이벤트" },
      { q: "로딩 상태를 설계해야 하는 이유는?", a: "사용자에게 현재 처리 중임을 알려야 하기 때문이다." },
    ],
    summary: ["웹앱은 상태와 이벤트로 움직인다.", "로딩과 에러 상태도 명시해야 한다.", "상태 머신 사고는 복잡한 UI 버그를 줄인다."],
    checklist: ["가능한 상태를 모두 적었는가", "상태 전이 이벤트를 정의했는가", "에러와 로딩 상태가 있는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-7 쿠키와 세션",
    topic: "로그인 유지에 필요한 쿠키와 세션의 역할 이해하기",
    goals: ["쿠키의 역할을 설명할 수 있다.", "세션 기반 로그인 흐름을 이해할 수 있다.", "브라우저가 로그인 상태를 유지하는 방식을 설명할 수 있다."],
    sections: [
      {
        heading: "쿠키란",
        body: "쿠키는 브라우저에 저장되는 작은 데이터다. 서버는 쿠키를 통해 같은 사용자의 요청인지 구분할 수 있다.",
      },
      {
        heading: "세션이란",
        body: "세션은 서버가 사용자 상태를 기억하는 방식이다. 브라우저는 세션 ID를 쿠키로 보내고, 서버는 해당 ID로 로그인 상태를 찾는다.",
        points: ["로그인 성공", "서버가 세션 생성", "브라우저에 세션 ID 쿠키 저장", "다음 요청마다 쿠키 전송"],
      },
      {
        heading: "흔한 실수",
        body: "쿠키에 민감한 사용자 정보를 그대로 저장하면 탈취 시 큰 문제가 된다.",
      },
    ],
    tableRows: [
      ["쿠키", "브라우저에 저장되는가?", "작고 필요한 값만 저장한다."],
      ["세션", "서버가 상태를 기억하는가?", "로그인 상태를 서버에서 관리한다."],
      ["세션 ID", "사용자를 식별하는 키인가?", "민감정보 자체를 담지 않는다."],
    ],
    examples: [
      { title: "로그인 유지", detail: "브라우저가 세션 ID 쿠키를 보내면 서버가 로그인 사용자를 확인한다." },
      { title: "장바구니", detail: "비회원 장바구니도 쿠키나 세션으로 임시 상태를 유지할 수 있다." },
    ],
    activity: {
      title: "Application 탭에서 쿠키를 확인한다.",
      steps: ["로그인이 필요한 사이트에 접속한다.", "DevTools Application 탭을 연다.", "Cookies 항목을 확인한다.", "쿠키 이름과 만료 시간을 관찰한다."],
      output: "쿠키 관찰 기록",
    },
    quiz: [
      { q: "쿠키는 어디에 저장되는가?", a: "브라우저" },
      { q: "세션 정보는 주로 어디에서 관리하는가?", a: "서버" },
    ],
    summary: ["쿠키는 브라우저 저장소다.", "세션은 서버가 사용자 상태를 기억하는 방식이다.", "로그인 유지에는 쿠키와 세션이 함께 쓰일 수 있다."],
    checklist: ["쿠키와 세션을 구분할 수 있는가", "세션 ID 흐름을 설명할 수 있는가", "민감정보를 쿠키에 직접 저장하지 않는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-8 LocalStorage와 SessionStorage",
    topic: "브라우저 저장소의 종류와 사용 기준 이해하기",
    goals: ["LocalStorage와 SessionStorage의 차이를 설명할 수 있다.", "브라우저 저장소에 넣어도 되는 정보와 안 되는 정보를 구분할 수 있다.", "Application 탭에서 저장소를 확인할 수 있다."],
    sections: [
      {
        heading: "LocalStorage",
        body: "LocalStorage는 브라우저에 오래 남는 key-value 저장소다. 브라우저를 닫아도 데이터가 남는다.",
      },
      {
        heading: "SessionStorage",
        body: "SessionStorage는 탭이나 세션이 유지되는 동안만 남는 저장소다. 탭을 닫으면 데이터가 사라진다.",
      },
      {
        heading: "주의할 점",
        body: "LocalStorage와 SessionStorage는 사용자가 확인할 수 있으므로 비밀번호, 토큰, 개인정보 같은 민감정보를 함부로 저장하면 안 된다.",
      },
    ],
    tableRows: [
      ["LocalStorage", "브라우저를 닫아도 남는가?", "사용자 설정처럼 민감하지 않은 값에 사용한다."],
      ["SessionStorage", "탭을 닫으면 사라지는가?", "일시적인 입력 상태에 사용한다."],
      ["민감정보", "사용자에게 노출되면 위험한가?", "브라우저 저장소에 두지 않는다."],
    ],
    examples: [
      { title: "테마 설정", detail: "다크모드 여부는 LocalStorage에 저장할 수 있다." },
      { title: "임시 폼 상태", detail: "탭 안에서만 필요한 값은 SessionStorage에 둘 수 있다." },
    ],
    activity: {
      title: "Application 탭에서 LocalStorage와 SessionStorage를 확인한다.",
      steps: ["DevTools Application 탭을 연다.", "LocalStorage 항목을 확인한다.", "SessionStorage 항목을 확인한다.", "저장된 key와 value를 비교한다."],
      output: "브라우저 저장소 비교표",
    },
    quiz: [
      { q: "브라우저를 닫아도 남는 저장소는?", a: "LocalStorage" },
      { q: "비밀번호를 LocalStorage에 저장해도 되는가?", a: "안 된다." },
    ],
    summary: ["브라우저 저장소는 편리하지만 노출 가능성을 전제로 써야 한다.", "LocalStorage는 오래 남고 SessionStorage는 세션 동안만 남는다.", "민감정보는 저장하지 않는다."],
    checklist: ["두 저장소의 수명을 구분할 수 있는가", "Application 탭에서 값을 확인할 수 있는가", "민감정보 저장 여부를 검토했는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-9 브라우저 개발자도구 마스터",
    topic: "Network, Application, Performance 탭으로 웹 동작 분석하기",
    goals: ["Network 탭으로 요청과 응답을 분석할 수 있다.", "Application 탭으로 쿠키와 저장소를 확인할 수 있다.", "Performance 탭으로 렌더링 흐름을 관찰할 수 있다."],
    sections: [
      {
        heading: "Network 탭",
        body: "Network 탭은 브라우저가 서버와 주고받은 요청과 응답을 보여준다. 요청 URL, 메서드, 상태 코드, 헤더, 본문을 확인할 수 있다.",
      },
      {
        heading: "Application 탭",
        body: "Application 탭에서는 쿠키, LocalStorage, SessionStorage, 캐시 등 브라우저에 저장된 데이터를 확인할 수 있다.",
      },
      {
        heading: "Performance 탭",
        body: "Performance 탭은 페이지 로딩과 렌더링에 걸린 시간을 분석할 때 사용한다.",
      },
    ],
    tableRows: [
      ["Network", "서버 요청을 보는가?", "API 오류와 응답 시간을 확인한다."],
      ["Application", "브라우저 저장소를 보는가?", "쿠키와 Storage 값을 확인한다."],
      ["Performance", "느린 화면을 분석하는가?", "렌더링과 스크립트 비용을 찾는다."],
    ],
    examples: [
      { title: "API 오류", detail: "Network 탭에서 400, 401, 500 상태 코드를 확인한다." },
      { title: "로그인 쿠키", detail: "Application 탭에서 쿠키가 저장됐는지 확인한다." },
    ],
    activity: {
      title: "네이버 접속 후 DevTools 3개 탭을 각각 관찰한다.",
      steps: ["Network에서 첫 요청을 확인한다.", "Application에서 쿠키와 저장소를 확인한다.", "Performance에서 새로고침 녹화를 실행한다.", "관찰 내용을 표로 정리한다."],
      output: "DevTools 관찰 리포트",
    },
    quiz: [
      { q: "API 요청 실패를 가장 먼저 볼 탭은?", a: "Network 탭" },
      { q: "쿠키를 확인하는 탭은?", a: "Application 탭" },
    ],
    summary: ["개발자도구는 웹 동작을 보는 현미경이다.", "Network, Application, Performance 탭은 초보 단계에서 반드시 익혀야 한다.", "문제 상황을 감이 아니라 증거로 확인한다."],
    checklist: ["Network 탭에서 요청을 찾을 수 있는가", "Application 탭에서 저장소를 확인할 수 있는가", "Performance 탭에서 녹화할 수 있는가"],
  }),
  makeModule0OutlineLesson({
    title: "Lesson 0-10 실전 디버깅 입문",
    topic: "문제를 재현하고 원인을 좁혀가는 기본 디버깅 절차 익히기",
    goals: ["문제 재현의 중요성을 설명할 수 있다.", "콘솔과 Network 탭으로 오류를 추적할 수 있다.", "가설을 세우고 검증하는 방식으로 디버깅할 수 있다."],
    sections: [
      {
        heading: "디버깅이란",
        body: "디버깅은 버그를 감으로 맞히는 일이 아니라 문제를 재현하고 증거를 모아 원인을 좁혀가는 과정이다.",
      },
      {
        heading: "기본 절차",
        body: "먼저 재현 조건을 적고, 콘솔 오류를 확인하고, Network 요청을 확인한 뒤, 최근 변경 사항과 입력값을 점검한다.",
        points: ["재현", "관찰", "가설", "검증", "수정", "재확인"],
      },
      {
        heading: "흔한 실수",
        body: "오류 메시지를 읽지 않고 코드를 무작정 바꾸면 원인을 놓치고 새로운 버그를 만들 수 있다.",
      },
    ],
    tableRows: [
      ["재현", "항상 같은 조건에서 발생하는가?", "단계별 재현 절차를 적는다."],
      ["관찰", "어떤 증거가 있는가?", "Console과 Network를 확인한다."],
      ["가설", "무엇이 원인일 수 있는가?", "하나씩 검증한다."],
      ["재확인", "수정 후 다시 테스트했는가?", "같은 절차로 재검증한다."],
    ],
    examples: [
      { title: "로그인 실패", detail: "Network 탭에서 401 응답과 요청 본문을 확인한다." },
      { title: "버튼 무반응", detail: "Console 오류와 클릭 이벤트 연결 여부를 확인한다." },
    ],
    activity: {
      title: "가상의 로그인 실패 상황을 디버깅 절차로 분석한다.",
      steps: ["재현 절차를 적는다.", "예상 결과와 실제 결과를 비교한다.", "Console과 Network에서 확인할 항목을 적는다.", "가능한 원인 3개와 검증 방법을 작성한다."],
      output: "실전 디버깅 리포트",
    },
    quiz: [
      { q: "디버깅의 첫 단계는?", a: "문제를 재현하는 것이다." },
      { q: "서버 응답 오류를 확인할 때 보는 탭은?", a: "Network 탭" },
    ],
    summary: ["디버깅은 재현과 증거 수집에서 시작한다.", "Console과 Network 탭은 가장 기본적인 도구다.", "가설을 하나씩 검증해야 원인을 정확히 찾을 수 있다."],
    checklist: ["재현 절차를 적었는가", "Console 오류를 확인했는가", "Network 요청을 확인했는가", "수정 후 같은 절차로 재확인했는가"],
  }),
]

export const agentWorkflowCourse = {
  id: "agent-workflow",
  track: "advanced",
  step: "심화 과정",
  title: "Agent with Workflow",
  audience: "AI 활용 경험이 있고 반복 업무를 구조화하고 싶은 실무자",
  duration: "12모듈",
  summary: "단일 프롬프트 사용을 넘어 Agent, 도구, 데이터, 검증, 승인 흐름을 연결해 실제 업무용 워크플로우를 설계합니다.",
  outcome: "내 업무 하나를 Agent Workflow 프로젝트 패키지로 완성하고, 테스트와 가드레일을 포함한 운영 계획까지 만들 수 있습니다.",
  objectives: [
    "Agent, Workflow, Automation, RAG, Tool Calling의 차이를 설명한다.",
    "업무를 상태, 입력, 처리, 검증, 출력으로 분해한다.",
    "프롬프트 체인, 도구 호출, 메모리, 평가, 가드레일을 연결한다.",
    "실제 업무용 Agent Workflow 프로젝트를 설계하고 발표한다.",
  ],
  concepts: [
    "Agent는 목표를 달성하기 위해 여러 단계를 계획하고 실행하는 업무 실행 단위입니다.",
    "Workflow는 Agent가 움직이는 절차이며, 분기 조건과 검증 기준이 있어야 안정적으로 반복됩니다.",
    "프로덕션 수준의 Agent는 도구, 데이터, 평가, 가드레일, 사람 승인을 함께 설계해야 합니다.",
  ],
  schedule: agentWorkflowLessons.map((lesson, index) => ({
    time: `Module ${index}`,
    title: lesson.title.replace(`Module ${index}. `, ""),
    detail: lesson.topic,
  })),
  lessons: agentWorkflowLessons,
  examples: ["AI Meeting Agent", "AI Research Agent", "Customer Support Agent", "Weekly Report Agent"],
  practice: "실제 업무 하나를 선택해 Agent Workflow 설계도, 프롬프트 체인, 테스트 케이스, 승인 규칙을 완성합니다.",
  goodPrompt: `너는 Agent Workflow 설계 코치야.
내 업무는 [반복 업무]이고 현재 [소요 시간/문제]가 있어.
이 업무를 Agent Workflow로 설계해줘.

출력 형식:
1. 문제 정의
2. 입력 데이터
3. 단계별 workflow
4. 각 단계의 프롬프트 또는 도구
5. 검증 기준
6. 사람 승인 지점
7. 테스트 케이스
8. 실패 시 대응`,
  promptComparison: {
    bad: "업무 자동화 Agent 만들어줘.",
    improved: "주간 보고서 초안 작성 업무를 입력, 처리, 검증, 출력 단계로 나누고 각 단계에 필요한 프롬프트, 도구, 승인 기준을 설계해줘.",
    reason: "Agent는 목표와 단계, 도구, 검증 기준이 있어야 실제 업무 흐름으로 만들 수 있습니다.",
  },
  checklist: [
    "문제 정의가 측정 가능한가?",
    "입력과 출력 형식이 고정되어 있는가?",
    "프롬프트 체인이 단계별로 분리되어 있는가?",
    "도구 호출 조건과 권한이 정의되어 있는가?",
    "평가 기준과 테스트 케이스가 있는가?",
    "고위험 결과에 사람 승인 단계가 있는가?",
  ],
  questions: ["Agent와 Workflow의 차이는 무엇인가?", "Agent를 프로덕션에 적용하기 전 무엇을 테스트해야 하는가?"],
  nextSteps: ["작은 업무 하나에 파일럿 적용 후 사용 로그와 실패 케이스를 수집합니다."],
  materials: ["Agent Workflow Canvas", "Prompt Chain Template", "Evaluation Sheet", "Guardrail Checklist"],
  evaluation: ["워크플로우가 실행 가능한가?", "검증과 승인 기준이 명확한가?", "테스트 결과를 바탕으로 개선했는가?"],
  references: [{ name: "OpenAI Platform Docs", url: "https://platform.openai.com/docs" }],
}

const standardSchedule = [
  "개념 설명",
  "비유",
  "아키텍처 다이어그램",
  "코드 예제",
  "실습",
  "흔한 실수",
  "실패 사례",
  "프로덕션 패턴",
  "퀴즈",
  "과제",
  "심화 읽기",
  "실무 체크리스트",
]

export const agentWorkflowModuleLevels = agentWorkflowLessons.map((lesson, index) => ({
  id: `agent-workflow-module-${index}`,
  parentCourseId: "agent-workflow",
  track: "advanced",
  step: `Module ${index}`,
  title: index === 0 ? "웹의 본질과 컴퓨터 사고" : lesson.title.replace(`Module ${index}. `, ""),
  audience: agentWorkflowCourse.audience,
  duration: "심화 과정",
  summary: index === 0 ? "웹사이트와 웹앱의 차이, 클라이언트-서버 모델, 요청과 응답의 기본 흐름을 이해합니다." : lesson.topic,
  outcome: index === 0 ? "웹 요청 분석 리포트와 서비스 분류표를 만들 수 있습니다." : lesson.activity.output,
  objectives: index === 0 ? ["웹사이트와 웹앱의 차이를 설명할 수 있다.", "클라이언트와 서버를 구분할 수 있다.", "요청과 응답의 흐름을 이해한다.", "데이터 저장과 DB가 필요한 이유를 설명할 수 있다."] : lesson.goals,
  concepts: index === 0 ? ["웹사이트는 정보 제공이 핵심이고, 웹앱은 사용자 행동 처리와 상태 저장이 핵심입니다.", "클라이언트는 사용자 가까이에 있는 프로그램이고, 서버는 요청을 처리하는 프로그램입니다.", "브라우저는 요청을 보내고 서버는 응답을 반환합니다.", "비밀정보와 데이터베이스 접근은 서버에서 관리해야 합니다."] : lesson.sections.slice(0, 4).map((section) => section.body),
  schedule:
    index === 0
      ? module0Lessons.map((moduleLesson, lessonIndex) => ({
          time: `Lesson 0-${lessonIndex + 1}`,
          title: moduleLesson.title.replace(`Lesson 0-${lessonIndex + 1} `, ""),
          detail: moduleLesson.topic,
        }))
      : standardSchedule.map((title, scheduleIndex) => ({
          time: `${scheduleIndex + 1}`,
          title,
          detail: lesson.sections[scheduleIndex]?.body ?? `${title} 항목을 실무 적용 관점에서 점검합니다.`,
        })),
  lessons: index === 0 ? module0Lessons : [lesson],
  examples: index === 0 ? ["Naver Blog", "Gmail", "Notion", "Chrome DevTools Network"] : lesson.examples.map((example) => example.title),
  practice: index === 0 ? "서비스 분류표와 웹 요청 분석 리포트를 작성합니다." : lesson.activity.title,
  goodPrompt: agentWorkflowCourse.goodPrompt,
  promptComparison: agentWorkflowCourse.promptComparison,
  checklist: lesson.sections.find((section) => section.heading === "12. 실무 체크리스트")?.points ?? agentWorkflowCourse.checklist,
  questions: lesson.quiz.map((item) => item.q),
  nextSteps: agentWorkflowCourse.nextSteps,
  materials: agentWorkflowCourse.materials,
  evaluation: agentWorkflowCourse.evaluation,
  references: agentWorkflowCourse.references,
}))
