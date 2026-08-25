import { siteContent, runtimeConfig } from "../data/siteContent.js";

export function ProofSection() {
  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="content-width proof-section__heading">
        <p className="section-index">Những điều có thể kiểm tra</p>
        <h2 id="proof-title">Một sản phẩm số, với kỳ vọng rõ ràng.</h2>
        <p>
          Study Success Bundle không hứa thay bạn học. Nó cung cấp một cấu trúc để bạn tự quyết định điều cần làm, điều cần giữ và điều cần trình bày.
        </p>
      </div>
      <div className="content-width proof-list">
        {siteContent.proofItems.map((item) => (
          <article className="proof-item" key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
        <article className="proof-item proof-item--status">
          <span>04</span>
          <h3>{runtimeConfig.checkoutUrl ? "Checkout đã được nối" : "Checkout đang ở chế độ preview"}</h3>
          <p>{runtimeConfig.checkoutUrl ? "Nút mua sẽ mở liên kết checkout được cấu hình." : "Chưa có liên kết thanh toán hoặc email giao file nào được cấu hình trong bản này."}</p>
        </article>
      </div>
    </section>
  );
}
