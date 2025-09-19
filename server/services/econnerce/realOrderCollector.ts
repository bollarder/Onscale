// artifact의 RealOrderCollector 클래스 부분을 복사
// 스마트스토어 주문 조회 예시
async function fetchSmartStoreOrders() {
  const response = await axios.get(
    "https://api.commerce.naver.com/external/v1/orders",
    {
      headers: {
        Authorization: `Bearer ${process.env.SMARTSTORE_API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        lastChangedFrom: new Date(
          Date.now() - 24 * 60 * 60 * 1000,
        ).toISOString(), // 최근 24시간
        lastChangedTo: new Date().toISOString(),
      },
    },
  );

  return response.data;
}
