 // 예시용 연관 검색어
  const suggestions = [
    "넷플릭스",
    "정보처리기사",
    "AI 전문가 특강",
    "초여름 플레이리스트",
    "마감 직전 음악",
    "게임 스트리머",
    "요리 레시피",
    "문학 추천",
    "팟캐스트 인기",
    "K-pop"
  ];

  const input = document.getElementById("searchInput");
  const dropdown = document.getElementById("suggestionList");

  input.addEventListener("input", function () {
    const query = input.value.trim().toLowerCase();
    dropdown.innerHTML = "";

    if (query.length === 0) {
      dropdown.style.display = "none";
      return;
    }

    const filtered = suggestions.filter(item => item.toLowerCase().includes(query));

    if (filtered.length === 0) {
      dropdown.style.display = "none";
      return;
    }

    filtered.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a class="dropdown-item" href="#">${item}</a>`;
      dropdown.appendChild(li);
    });

    dropdown.style.display = "block";
  });

  // 포커스를 잃으면 메뉴 숨기기
  input.addEventListener("blur", () => {
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 200);
  });