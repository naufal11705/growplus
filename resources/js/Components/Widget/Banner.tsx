import { useEffect } from "react";

export default function Banner() {
    useEffect(() => {
        const scrollContainer = document.getElementById("scroll-container-1");
        if (!scrollContainer) return;

        let scrollPosition = 0;

        const animateScroll = () => {
            scrollPosition -= 1;
            scrollContainer.style.transform = `translateX(${scrollPosition}px)`;

            const firstChild = scrollContainer.firstElementChild as HTMLElement | null;
            if (firstChild && firstChild.getBoundingClientRect().right < 0) {
                scrollContainer.appendChild(firstChild);
                scrollPosition += firstChild.offsetWidth;
            }

            requestAnimationFrame(animateScroll);
        };

        const cloneContent = () => {
            const children = Array.from(scrollContainer.children) as HTMLElement[];
            children.forEach((child) => {
                const clone = child.cloneNode(true) as HTMLElement;
                scrollContainer.appendChild(clone);
            });
        };

        const items: string[] = [
            `<span class="text-white lg:text-[35px] text-xl font-semibold">Makan Sehat, Hidup Bahagia</span>`,
            `<span class="text-white lg:text-[35px] text-xl font-semibold">✦</span>`,
            `<span class="text-white lg:text-[35px] text-xl font-semibold">Nutrisi Baik untuk Masa Depan</span>`,
            `<span class="text-white lg:text-[35px] text-xl font-semibold">✦</span>`
        ];

        for (let i = 0; i < 10; i++) {
            items.forEach((item) => {
                scrollContainer.innerHTML += item;
            });
        }

        cloneContent();
        animateScroll();
    }, []);

    return (
        <section className="relative lg:mt-10 mt-5">
            <div className="absolute -inset-x-2 -inset-y-2 right-1  bg-gray-200 rotate-2 -z-30"></div>
            <div className="absolute inset-0 bg-wine -z-20"></div>
            <section className="relative py-4 text-center lg:py-8 overflow-hidden">
                <div id="scroll-container-1" className="flex lg:gap-12 gap-8 whitespace-nowrap"></div>
            </section>
        </section>
    );
}
