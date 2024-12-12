import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Element, Link, scroller } from "react-scroll"; // Import from react-scroll
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import logo from "../assets/logo2.png";

//gifs
import notesGif from "../assets/notes.gif";
import timerGif from "../assets/timer.gif";
import calendarGif from "../assets/calendar.gif";
import todo from "../assets/todo.gif";
import dashboard from "../assets/dashboard.svg";


import calendar from "../assets/LandingCalendar.png";
import notes from "../assets/LandingNotes.png";
import task from "../assets/LandingTask.png";
import timer from "../assets/LandingTimer.png";

import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const carouselItems = [
  {
    title: "To-do List",
    description: "Organize your tasks and check them off as you complete them",
    image: task,
  },
  {
    title: "Calendar",
    description:
      "Plan your schedule and never miss a deadline with our task calendar.",
    image: calendar,
  },
  {
    title: "Timer",
    description:
      "Boost your productivity with our built-in timer to manage your study or work sessions.",
    image: timer,
  },
  {
    title: "Sticky Notes",
    description:
      "Quickly jot down your thoughts and ideas with our sticky notes feature.",
    image: notes,
  },
];

export default function Landing() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const scrollToNextSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <>
      <Element name="section1">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            marginBottom: 2,
            alignItems: "center",
            backgroundImage: "linear-gradient(45deg, #4259c1, #1f295a)",
            position: "relative",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "90%",
                  marginLeft: 25,
                  mb: 20,
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "250px", height: "250px" }}
                />
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ mt: 2, color: "#eeeeee" }}
                >
                  Start your productivity journey with TaskSync.
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ mb: 4, color: "#eeeeee" }}
                >
                  Login or Sign up now!
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "50%",
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    sx={{
                      backgroundColor: "#4259c1",
                      color: "#eeeeee",
                    }}
                    size="large"
                    fullWidth
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderColor: "#eeeeee",
                      color: "#eeeeee",
                    }}
                    size="large"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slider
                {...settings}
                style={{ width: "50%", borderRadius: "8px", marginLeft: 40 }}
              >
                {carouselItems.map((item, index) => (
                  <Box key={index} sx={{ padding: 2 }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "90%",
                        borderRadius: "10px",
                        margin: "10px",
                      }}
                    />
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{ mt: 2, color: "#eeeeee" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, color: "#eeeeee" }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                ))}
              </Slider>
            </Grid>
          </Grid>
          <Box
            sx={{
              position: "absolute",
              zIndex:2,
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": {
                  transform: "translateY(0) translateX(-50%)",
                },
                "40%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
                "60%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
              },
            }}
            onClick={() => scrollToNextSection("section2")}
          >
            <Typography
              sx={{
                color: "#eeeeee",
                fontSize: "2rem",
                userSelect: "none",
              }}
            >
              <ArrowDropDownCircleIcon
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Element>

  
      <Element name="section2">
        <Box
          sx={{
            height: "100vh",
            position: "relative",
            marginBottom: 2,
            background:'#D4EBF8',
            transition: "all 0.5s ease-in-out",
          }}
        >
            <Grid container spacing={2} sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Box sx={{ position: 'absolute', background: '#1c329b', width: '100%', maxWidth: '600px', height: '350px', transform: 'translate(-40px, -30px)', borderRadius: '16px', opacity: 0.6 }}/>
                <Box sx={{ position: 'relative' }}>
                  <img src={todo} alt="Todo Demo" style={{ border: '5px solid black', borderRadius: '16px', width: '100%', maxWidth: '700px', height: 'auto', position: 'relative' }}/>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ padding: 4 }}>
                  <Typography variant="h3" sx={{ color: '#1c329b', mb: 2 }}>
                    Todo list
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#1c329b', mb: 4, width:'400px' }}>
                    Organize your tasks efficiently with our intuitive todo list. Set priorities, deadlines, and track your progress.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          <Box
            sx={{
              position: "absolute",
              zIndex:2,
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": {
                  transform: "translateY(0) translateX(-50%)",
                },
                "40%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
                "60%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
              },
            }}
            onClick={() => scrollToNextSection("section3")}
          >
            <Typography
              sx={{
                color: "#1c329b",
                fontSize: "2rem",
                userSelect: "none",
              }}
            >
              <ArrowDropDownCircleIcon
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Element>

      <Element name="section3">
        <Box
          sx={{
            height: "100vh",
            position: "relative",
            marginBottom: 2,
            backgroundImage: "linear-gradient(45deg, #4259c1, #1f295a)",
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Grid container spacing={2} sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ padding: 4 }}>
                <Typography variant="h3" sx={{ color: '#ffffff', mb: 2 }}>
                  Calendar
                </Typography>
                <Typography variant="h5" sx={{ color: '#ffffff', mb: 4, width: '400px' }}>
                  Keep track of your schedule and never miss important deadlines. Seamlessly integrate tasks with your calendar.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', background: '#d4ebf8', width: '100%', maxWidth: '600px', height: '350px', transform: 'translate(40px, 20px)', borderRadius: '16px', opacity: 0.6 }}/>
              <Box sx={{ position: 'relative' }}>
                <img src={calendarGif} alt="Calendar Demo" style={{ border: '5px solid black', borderRadius: '16px', width: '100%', maxWidth: '700px', height: 'auto', position: 'relative' }}/>
              </Box>
            </Grid>
          </Grid>
        
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": {
                  transform: "translateY(0) translateX(-50%)",
                },
                "40%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
                "60%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
              },
            }}
            onClick={() => scrollToNextSection("section4")}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "2rem",
                userSelect: "none",
              }}
            >
              <ArrowDropDownCircleIcon
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Element>



      <Element name="section4">
        <Box
          sx={{
            height: "100vh",
            marginBottom: 2,
            position: "relative",
            background:'#d4ebf8',
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Grid container spacing={2} sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', background: '#1c329b', width: '100%', maxWidth: '600px', height: '350px', transform: 'translate(-40px, -30px)', borderRadius: '16px', opacity: 0.6 }}/>
                <Box sx={{ position: 'relative' }}>
                  <img src={timerGif} alt="Timer Demo" style={{ border: '5px solid black', borderRadius: '16px', width: '100%', maxWidth: '700px', height: 'auto', position: 'relative' }}/>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ padding: 4 }}>
                <Typography variant="h3" sx={{ color: '#1c329b', mb: 2 }}>
                  Focus Timer
                </Typography>
                <Typography variant="h5" sx={{ color: '#1c329b', mb: 4, width:'400px'}}>
                  Stay productive with our customizable timer. Perfect for Pomodoro technique or any time management method.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": {
                  transform: "translateY(0) translateX(-50%)",
                },
                "40%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
                "60%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
              },
            }}
            onClick={() => scrollToNextSection("section5")}
          >
            <Typography
              sx={{
                color: "#1c329b",
                fontSize: "2rem",
                userSelect: "none",
              }}
            >
              <ArrowDropDownCircleIcon
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Element>

    <Element name="section5">
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          backgroundImage: "linear-gradient(45deg, #4259c1, #1f295a)",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": {
                transform: "translateY(0) translateX(-50%)",
              },
              "40%": {
                transform: "translateY(-10px) translateX(-50%)",
              },
              "60%": {
                transform: "translateY(-10px) translateX(-50%)",
              },
            },
          }}
          onClick={() => scrollToNextSection("section6")}
        >
          <Typography
            sx={{
              color: "#eeeeee",
              fontSize: "2rem",
              userSelect: "none",
            }}
          >
            <ArrowDropDownCircleIcon
              sx={{
                opacity: 0.5,
                transition: "opacity 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
            />
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ height: "100%", position: "relative", zIndex: 1 }}
        >
          <Grid item xs={12} md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
                <Box sx={{ padding: 4 }}>
                <Typography variant="h3" sx={{ color: '#ffffff', mb: 2 }}>
                  Notes
                </Typography>
                <Typography variant="h5" sx={{ color: '#ffffff', mb: 4, width: '400px' }}>
                  Quickly capture your thoughts and ideas with our digital sticky notes. Organize, color-code, and access your notes from anywhere.
                </Typography>
              </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                background: "#d4ebf8",
                width: "100%",
                maxWidth: "600px",
                height: "350px",
                transform: "translate(40px, 20px)",
                borderRadius: "16px",
                opacity: 0.6,
              }}
            />
            <Box sx={{ position: "relative" }}>
              <img
                src={notesGif}
                alt="Notes Demo"
                style={{
                  border: "5px solid black",
                  borderRadius: "16px",
                  width: "100%",
                  maxWidth: "800px",
                  height: "auto",
                  position: "relative",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Element>


      <Element name="section6">
        <Box 
          sx={{
            minHeight: "100vh",
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: "#D4EBF8",
            position: "relative",
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#1c329b',
              mb: 4,
              textAlign: 'center',
            }}
          >
            All Your Tools in One Place
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#1c329b',
              mb: 6,
              textAlign: 'center',
            }}
          >
            Access everything you need from our intuitive dashboard. Manage your tasks, schedule, notes, and more.
          </Typography>
          <Box xs={12} md={8}>
            <img
              src={dashboard}
              alt="dashboard"
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "auto",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              zIndex:2,
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": {
                  transform: "translateY(0) translateX(-50%)",
                },
                "40%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
                "60%": {
                  transform: "translateY(-10px) translateX(-50%)",
                },
              },
            }}
            onClick={() => scrollToNextSection("section1")}
          >
            <Typography
              sx={{
                color: "#334596",
                background: "white",
                borderRadius: "50%",
                userSelect: "none",
                padding: "2px 5px 0px 5px",
              }}
            >
              <KeyboardDoubleArrowUpIcon
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Element>
    </>
  );
}
