// imports
import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Slider from "react-slick"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// styles
const StyledBackgroundImage = styled(BackgroundImage)`
  width: 100%;
  height: 500px;
  transition: 0.3s ease;
  position: relative;

  @media (max-width: 1440px) {
    height: 500px;
  }

  @media (max-width: 1024px) {
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 575px) {
    height: 300px;
    text-align: center;
  }
`

const Wrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`

const SlideContent = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  p {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 28px;
    }
  }
`

const StyledButton = styled(Link)`
  background-color: #045490;
  border: 2px solid transparent;
  color: #ffffff;
  padding: 8px 12px;
  transition: 0.3s ease;
  &:hover {
    color: #045490;
    border: 2px solid #045490;
    background-color: #ffffff;
    text-decoration: none;
  }
`

const StyledSlider = styled(Slider)`
  .slick-dots {
    position: absolute;
    bottom: 10px;
    li {
      button::before {
        color: white;
        font-size: 10px;
        color: white;
      }
    }
    .slick-active {
      button::before {
        color: white;
      }
    }
  }
`

// query
const HOMEPAGE_DATA = graphql`
  {
    prismicHomePage {
      data {
        slider {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          title {
            text
          }
          text {
            text
          }
          button_text {
            text
          }
          page_link {
            text
          }
        }
      }
    }
  }
`

// slide component
export const Slide = props => {
  return (
    <StyledBackgroundImage fluid={props.image} alt={`${props.title}`}>
      <Wrapper>
        <SlideContent>
          <h1>{props.title}</h1>
          <p>{props.text}</p>

          <div className="slide-btn">
            <Button path={props.path_url} text={props.button_text} />
          </div>
        </SlideContent>
      </Wrapper>
    </StyledBackgroundImage>
  )
}

export const Button = props => {
  return (
    <StyledButton to={props.path} title={`${props.text}`}>
      {props.path}
    </StyledButton>
  )
}

// home component
const Home = () => {
  // get homepage data
  const data = useStaticQuery(HOMEPAGE_DATA)

  // simplify data
  const home_data = data.prismicHomePage.data

  console.log(home_data)

  // hero slide settings
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    dots: true,
  }

  return (
    <Wrapper>
      <h1>Bug Repo</h1>
      <StyledSlider {...settings}>
        {home_data.slider.map((slide, index) => {
          console.log(slide)
          const url = slide.page_link.text
          console.log(url)
          return (
            <Slide
              key={slide.title.text}
              title={slide.title.text}
              image={slide.image.localFile.childImageSharp.fluid}
              text={slide.text.text}
              button_text={slide.button_text.text}
              path_url={url}
            />
          )
        })}
      </StyledSlider>
    </Wrapper>
  )
}

export default Home
