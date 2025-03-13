const scrollContainer = document.getElementById("scroll-container-1");
    if (scrollContainer) {
        let scrollPosition = 0;

        const animateScroll = () => {
            scrollPosition -= 1;
            scrollContainer.style.transform = `translateX(${scrollPosition}px)`;

            const firstChild = scrollContainer.firstElementChild;
            if (firstChild && firstChild.getBoundingClientRect().right < 0) {
                scrollContainer.appendChild(firstChild);
                scrollPosition += firstChild.offsetWidth;
            }

            requestAnimationFrame(animateScroll);
        };

        const cloneContent = () => {
            const children = Array.from(scrollContainer.children);
            children.forEach((child) => {
                const clone = child.cloneNode(true);
                scrollContainer.appendChild(clone);
            });
        };

        const items = [
            `<span class="text-black lg:text-[35px] text-xl font-semibold">Front-End Developer</span>`,
            `<span class="text-black lg:text-[35px] text-xl font-semibold">✦</span>`,
            `<span class="text-black lg:text-[35px] text-xl font-semibold">UI/UX Designer</span>`,
            `<span class="text-black lg:text-[35px] text-xl font-semibold">✦</span>`,
        ];

        for (let i = 0; i < 10; i++) {
            items.forEach((item) => {
                scrollContainer.innerHTML += item;
            });
        }
        cloneContent();
        animateScroll();
    }