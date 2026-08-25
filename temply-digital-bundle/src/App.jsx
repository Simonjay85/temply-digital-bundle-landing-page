import { useState } from 'react';
import heroMockup from './assets/temply-study-bundle-hero.png';

const modules = [
  ['Chọn đúng lộ trình', 'Xác định mục tiêu học tập, ưu tiên và thói quen phù hợp với lịch của bạn.'],
  ['Lập kế hoạch dễ làm', 'Biến cả học kỳ thành các tuần rõ ràng với checklist và tracker thực tế.'],
  ['Nộp hồ sơ tự tin', 'Dùng bộ CV học thuật có cấu trúc sẵn để trình bày câu chuyện của bạn đẹp hơn.'],
  ['Duy trì nhịp độ', 'Các trang review giúp bạn nhìn lại, điều chỉnh và tiếp tục mà không bị quá tải.'],
];

const faqs = [
  ['Bundle này dành cho ai?', 'Dành cho sinh viên, giáo viên và người tự học muốn sắp xếp việc học, dự án và hồ sơ một cách rõ ràng hơn.'],
  ['Tôi nhận file như thế nào?', 'Ngay sau khi thanh toán, bạn sẽ nhận email có liên kết tải file. Đây là bản tải xuống kỹ thuật số, không có sản phẩm vật lý được gửi đi.'],
  ['Tôi có cần biết thiết kế không?', 'Không. Các mẫu đã có bố cục sẵn; bạn chỉ cần thay đổi nội dung, màu sắc hoặc chi tiết theo nhu cầu của mình.'],
  ['Có thể dùng trên điện thoại không?', 'Có. Bạn có thể xem và chỉnh sửa các file tương thích trên điện thoại, tablet hoặc máy tính. Trải nghiệm chỉnh sửa đầy đủ nhất là trên laptop/desktop.'],
];

function ScrollCta({ compact = false }) {
  return <button className={`cta ${compact ? 'cta--compact' : ''}`} onClick={() => document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth' })}>
    Nhận Study Success Bundle <span>• $12</span>
    <small>Tải xuống ngay sau thanh toán</small>
  </button>;
}

export function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <section className="hero">
        <div className="hero__inner">
          <p className="eyebrow">TEMPLY STUDIO · ACADEMIC EDITS</p>
          <h1>Học có định hướng.<br /><em>Làm hồ sơ có dấu ấn.</em></h1>
          <p className="hero__lead">Study Success Bundle là bộ template số gọn gàng để bạn lên kế hoạch học tập, theo dõi mục tiêu và trình bày năng lực thật chuyên nghiệp.</p>
          <ScrollCta />
          <p className="microcopy">Bộ file chỉnh sửa được · Dùng ngay theo nhịp của bạn</p>
        </div>
        <div className="hero__art"><img src={heroMockup} alt="Temply Studio academic planner and CV templates displayed on stationery" /></div>
      </section>

      <section className="statement shell">
        <p className="eyebrow">KHÔNG CẦN THÊM MỘT APP PHỨC TẠP</p>
        <h2>Bạn không thiếu động lực.<br />Bạn thiếu một hệ thống <em>có chỗ cho cuộc sống thật.</em></h2>
        <p>Không phải những bảng kế hoạch lạnh lùng và dài vô tận. Đây là một điểm bắt đầu mềm mại để bạn biết hôm nay nên làm gì — và nhìn thấy mình đã đi được bao xa.</p>
      </section>

      <section className="feature-band">
        <div className="shell split">
          <div><p className="eyebrow eyebrow--light">BỘ CÔNG CỤ TỪ TEMPLY STUDIO</p><h2>Một bộ template. Bốn bước để học và nộp hồ sơ <em>nhẹ đầu hơn.</em></h2></div>
          <p className="split__copy">Thiết kế tinh giản, đủ cấu trúc để dẫn đường nhưng vẫn linh hoạt để bạn biến nó thành của mình.</p>
        </div>
        <div className="shell module-grid">
          {modules.map(([title, text], index) => <article className="module" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="showcase shell">
        <div className="showcase__image"><img src={heroMockup} alt="Close product view of editable student planning templates" /></div>
        <div className="showcase__copy"><p className="eyebrow">BÊN TRONG BUNDLE</p><h2>Đủ chỉ dẫn để bắt đầu.<br /><em>Đủ khoảng trống để bạn lớn lên.</em></h2><ul><li>Planner học kỳ và weekly dashboard</li><li>Goal map &amp; habit tracker dễ nhìn</li><li>Academic CV template hiện đại</li><li>Reflection pages để giữ nhịp bền vững</li></ul><ScrollCta compact /></div>
      </section>

      <section className="story"><div className="shell story__grid"><div><p className="eyebrow eyebrow--light">VÌ SAO TEMPLY TẠO RA BỘ NÀY</p><h2>Việc học không nên là một cuộc chạy đua <em>đơn độc.</em></h2></div><div><p>Chúng tôi tạo những template có chức năng rõ ràng và vẻ đẹp vừa đủ để bạn muốn quay lại mỗi ngày. Không ép bạn thành một phiên bản năng suất bất khả thi — chỉ giúp những điều quan trọng có một chỗ đứng tử tế.</p><p>Hãy bắt đầu từ một tuần, một mục tiêu, một bản CV bạn tự hào khi gửi đi.</p></div></div></section>

      <section className="proof shell"><p className="eyebrow">THIẾT KẾ ĐỂ DÙNG THẬT</p><h2>Từ bàn học đến cơ hội <em>tiếp theo.</em></h2><div className="proof__cards"><article><strong>01</strong><p>Rõ việc cần làm<br />trong từng tuần</p></article><article><strong>02</strong><p>Nhìn tiến độ mà<br />không áp lực</p></article><article><strong>03</strong><p>Trình bày hồ sơ<br />với sự tự tin</p></article></div></section>

      <section className="faq shell"><p className="eyebrow">CÂU HỎI THƯỜNG GẶP</p><h2>Trước khi bạn <em>bắt đầu.</em></h2><div className="faq__list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? 'is-open' : ''} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>

      <section className="checkout" id="checkout"><div className="checkout__inner"><div className="checkout__intro"><p className="eyebrow eyebrow--light">BẮT ĐẦU TỪ HÔM NAY</p><h2>Study Success<br /><em>Bundle</em></h2><p>Nhận bộ template số được Temply Studio thiết kế cho những ngày bạn cần một điểm bắt đầu rõ ràng.</p><img src={heroMockup} alt="Study Success Bundle preview" /></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Họ và tên<input required name="name" placeholder="Nguyễn Minh Anh" /></label><label>Email<input required type="email" name="email" placeholder="ban@email.com" /></label><div className="order-row"><span>Study Success Bundle</span><strong>$12.00</strong></div><button className="order-button" type="submit">{submitted ? 'Đã ghi nhận — kiểm tra email của bạn' : 'Hoàn tất đơn hàng'}</button><small>Demo frontend · Form không xử lý thanh toán thật.</small></form></div></section>

      <footer><span>© 2026 Temply Studio</span><span>Digital templates for more intentional learning.</span></footer>
    </main>
  );
}
