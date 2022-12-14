import { NavLink, Redirect } from "react-router-dom";
import NavBar from "../NavBar";
import NavBarOnScroll from "../NavBarOnScroll";
import videoBillboard from "../../assets/vids/team-discussing.mp4";
import { useEffect, useState, useRef } from "react";
import TrustedCompanies from "./TrustedCompanies";
import teamVid1 from "../../assets/vids/team-connected.mp4";
import teamVid2 from "../../assets/vids/team-connected2.mp4";
import teamVid3 from "../../assets/vids/team-connected3.mp4";
import HomeVidTextRow from "./HomeVidTextRow";
import slackLogoSolo from "../../assets/images/solo-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import DemoLoginModal from "./DemoLoginModal";
import * as sessionActions from "../../store/session";

const HomePage = () => {
  const navRef = useRef();
  const navScrollRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const [openDemoLoginModal, setOpenDemoLoginModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventId = document.addEventListener("scroll", checkNavPosition);

    return () => {
      document.removeEventListener("scroll", eventId);
    };
  }, []);

  const handleDemoLogin = (e, userEmail) => {
    setOpenDemoLoginModal(false);

    return dispatch(
      sessionActions.loginUser({
        email: userEmail,
        password: "password",
      })
    ).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  const handleOpenDemoModal = () => {
    setOpenDemoLoginModal(!openDemoLoginModal);
  };

  const checkNavPosition = () => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      if (rect.bottom < -10) {
        setShowScrollNav(true);
      } else if (rect.bottom > -5) {
        setShowScrollNav(false);
      }
    }
  };

  if (sessionUser)
    return <Redirect to={`/client/${sessionUser.id}/get-started/landing`} />;

  const scrollUp = () => {
    navRef.current.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="main-container">
        <section
          className={openDemoLoginModal ? "demo-modal-container" : "hide"}
        >
          <DemoLoginModal
            handleDemoLogin={handleDemoLogin}
            handleOpenDemoModal={handleOpenDemoModal}
          />
        </section>
        <section className="nav-bars-cont">
          <NavBar
            ref={navRef}
            scroll={false}
            handleOpenDemoModal={handleOpenDemoModal}
          />
          {showScrollNav && (
            <NavBarOnScroll
              ref={navScrollRef}
              onClick={scrollUp}
              handleOpenDemoModal={handleOpenDemoModal}
            />
          )}
        </section>
        <section className="home-billboard">
          <div className="home-billboard-head">
            <h1>
              Great teamwork starts with a{" "}
              <span className="bill-yellow-text">digital HQ</span>
            </h1>
            <p>
              With all your people, tools and communication in one place, you
              can work faster and more flexibly than ever before.
            </p>
            <div className="sign-up-bill-cont">
              <NavLink
                to="/get-started/createnew"
                className="sign-btn right billboard"
              >
                TRY FOR FREE
              </NavLink>
            </div>
          </div>
          <video className="video" src={videoBillboard} autoPlay loop muted />
        </section>
      </section>

      <section className="home-section-2">
        <TrustedCompanies />
        <HomeVidTextRow
          position="left"
          video={teamVid1}
          title="Bring your team together"
          text="At the heart of Slick are channels: organized spaces for everyone and everything you need for work. In channels, it's easier to connect across departments, offices, time zones and even other companies."
        />
        <HomeVidTextRow
          position="right"
          video={teamVid2}
          title="Choose how you want to work"
          text="In Slick, you've got all the flexibility to work when, where and how it's best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live."
        />
        <HomeVidTextRow
          position="left"
          video={teamVid3}
          title="Move faster with your tools in one place"
          text="With your other work apps connected to Slick, you can work faster by switching tabs less. And with powerful tools like Workflow Builder, you can automate away routine tasks."
        />
      </section>
      <section className="home-section-3">
        <div className="home-section-3-content">
          <h2>Welcome to your new digital HQ</h2>
          <div className="sign-buttons sec-3">
            <NavLink
              to={"/get-started/createnew"}
              style={{ textDecoration: "none", color: "#fff" }}
              className="sec-3-sign-up"
            >
              Sign Up
            </NavLink>
            <NavLink
              to={"/signin/signin"}
              style={{
                textDecoration: "none",
                color: "#fff",
                marginLeft: "1.25rem",
              }}
              className="sec-3-log-in"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </section>
      <section className="home-section-4">
        <div className="section-4-content">
          <div onClick={scrollUp} style={{ cursor: "pointer" }}>
            <img src={slackLogoSolo} alt="logo" />
          </div>
          <a
            href="https://github.com/yanrivera19/Slick"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/ycrivera/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;
