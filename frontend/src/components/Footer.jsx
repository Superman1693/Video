import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg viewBox="0 0 36 36" fill="none" width="28" height="28">
              <rect width="36" height="36" rx="6" fill="#00B2FF"/>
              <path d="M8 12h4v12H8V12zm6 0l8 6-8 6V12zm10 0h4v12h-4V12z" fill="white"/>
            </svg>
            <span>腾讯视频</span>
          </div>
          <p className="footer__brand-desc">中国领先的在线视频媒体平台，为用户提供影视、综艺、动漫、纪录片等高品质内容。</p>
        </div>

        <div className="footer__links">
          <div className="footer__link-group">
            <h4>内容频道</h4>
            <a href="#">电影</a>
            <a href="#">电视剧</a>
            <a href="#">综艺</a>
            <a href="#">动漫</a>
            <a href="#">纪录片</a>
          </div>
          <div className="footer__link-group">
            <h4>用户服务</h4>
            <a href="#">VIP会员</a>
            <a href="#">帮助中心</a>
            <a href="#">意见反馈</a>
            <a href="#">举报违规</a>
          </div>
          <div className="footer__link-group">
            <h4>关于我们</h4>
            <a href="#">公司介绍</a>
            <a href="#">招贤纳士</a>
            <a href="#">商务合作</a>
            <a href="#">联系我们</a>
          </div>
          <div className="footer__link-group">
            <h4>移动端</h4>
            <div className="footer__app-badges">
              <div className="footer__app-badge">
                <span>📱</span>
                <div>
                  <div>App Store</div>
                  <div>iPhone / iPad</div>
                </div>
              </div>
              <div className="footer__app-badge">
                <span>🤖</span>
                <div>
                  <div>Android</div>
                  <div>手机 / 平板</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2024 腾讯视频 版权所有</p>
          <div className="footer__bottom-links">
            <a href="#">隐私政策</a>
            <a href="#">服务协议</a>
            <a href="#">法律声明</a>
            <a href="#">网络文化经营许可证</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
