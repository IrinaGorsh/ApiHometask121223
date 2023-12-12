class Slider {

    constructor(slideIndex, options) {
      this.options = options || {}
      this.interval = null
      this.slideIndex = slideIndex
      this.images = document.getElementsByClassName('image')
      this.Btns = document.getElementsByClassName('btn')
      this.dotContainer = document.querySelector('.dots')
  
      this.initControls()
      
        this.renderSlider()
  
      this.throttle = _throttle(this.renderSlider.bind(this), 300) 
  
      if (!this.options.fade)
        this.setupResizeListener() 
      
    }
  
   
  
    getSliderContent() {
      return document.querySelector('.container .slider')
    }
  
   
  
    renderSlider() {
      const {
        slideIndex,
        images,
        dotContainer,
        options: { fade = true }
      } = this
      
  
      if (slideIndex === -1)
        this.slideIndex = images.length - 1
      if (slideIndex > images.length - 1)
        this.slideIndex = 0
  
      if (fade) {
        for (let i = 0; i < images.length; i++)
          images[i].style.opacity = '0'
  
        images[this.slideIndex]
          .style.opacity = '1'
      } else {
  
        const contentBlock = this.getSliderContent()
  
        contentBlock.classList.add('fade-off')
  
        for (let i = 0; i < images.length; i++) {
          images[i].classList.add('fade-off')
        }
  
        const step = contentBlock.clientWidth
  
        contentBlock.style.left = `-${step * this.slideIndex}px`
      }
  
      const dotItems = dotContainer.childNodes
  
      for (let i = 0; i < dotItems.length; i++)
        dotItems[i].classList.remove('active')
  
      dotItems[this.slideIndex].classList.add('active')
    }
  
    initControls() {
      const { Btns, images, changeSlideIndex } = this
      for (let i = 0; i < Btns.length; i++) {
        Btns[i].addEventListener('click', changeSlideIndex.call(this, i))
      }
      for (let i = 0; i < images.length; i++) {
        this.renderDot(i)
      }
    }
  
    renderDot(index) {
      const { changeSlideIndex } = this
      const dotItem = document.createElement('div')
      dotItem.classList.add('dots-item')
  
      dotItem.addEventListener('click', changeSlideIndex.call(this, null, index))
  
      this.dotContainer.appendChild(dotItem)
    }
  
    changeSlideIndex(controlIndex, slideIndex) {
      return () => {
        if (slideIndex !== undefined) {
          this.slideIndex = slideIndex
        } else {
          switch (controlIndex) {
            case 0:
              this.slideIndex = this.slideIndex - 1
              break;
            case 1:
              this.slideIndex = this.slideIndex + 1
              break;
          }
        }
        this.renderSlider()
      }
    }
  
  }