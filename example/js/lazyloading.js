class LazyLoader
{
    /**
     * 
     * @param {string} selector CSS Selector 
     */
    constructor(selector = 'lazyloading')
    {
        this.selector   = selector;
        this.targets    = document.querySelectorAll(`.${selector} > img`);

        window.onload   = () => this.checkImages.call(this);
        window.onscroll = () => this.checkImages.call(this);
    }

    isIntersecting(target)
    {
        const docViewTop    = window.pageYOffset;
        const docViewBottom = docViewTop + window.innerHeight;
        const elemTop       = docViewTop + target.getBoundingClientRect().top;
        const elemBottom    = elemTop + target.height;

        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop))
            || ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop));
    }

    checkImages()
    {
        this.targets.forEach(target => {
            if (this.isIntersecting(target) && target.parentNode.classList.contains(this.selector)) {
                target.src = target.dataset.src;
                target.onload = () => {
                    target.parentNode.classList.remove(this.selector);
                    target.removeAttribute('data-src');
                }
            }
        });
    }
}
