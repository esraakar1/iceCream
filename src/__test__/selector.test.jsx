import { render, screen } from "@testing-library/react";
import Selector from "../components/list/selector";
import userEvent from "@testing-library/user-event";

const mockFn = jest.fn();

describe("selector bileşeni", () => {
    it("cornet secilince butonun arka planı değişir", () => {
        render(<Selector selectedType="cornet" handleType={() => {}} />
     );

      // cornet butonunda active class ları vardır
        const cornetBtn = screen.getByRole("button", {name: /külahta/i 
        });

        expect(cornetBtn).toHaveClass("bg-white text-black");

          const cupBtn = screen.getByRole("button", {name: /bardakta/i 
        });

        expect(cupBtn).not.toHaveClass("bg-white text-black");

    });


    it("cup seçilince butonun arkaplanı değişir", () => {
         render(<Selector selectedType="cup" handleType={() => {}} />
     );

      // cornet butonunda active class ları vardır
        const cornetBtn = screen.getByRole("button", {name: /külahta/i 
        });

        expect(cornetBtn).not.toHaveClass("bg-white text-black");

          const cupBtn = screen.getByRole("button", {name: /bardakta/i 
        });

        expect(cupBtn).toHaveClass("bg-white text-black");
    });


    it("butonlara tıklanınca fonksiyon doğru parametrelere çalışır", async () => {
        //  user event i kur
        const user = userEvent.setup();

        render(<Selector selectedType={null} handleType={mockFn} />);

        // butonları al
        const cupBtn = screen.getByRole("button", {name: /bardakta/i});
         const cornetBtn = screen.getByRole("button", {name: /külahta/i});

        //  bardak butonuna tıkla
       await user.click(cupBtn);

    //fonksiyonun cup parametresi ile çalıştı mı
       expect(mockFn).toHaveBeenCalledWith("cup");


        //  cornet butonuna tıkla
       await user.click(cornetBtn);

    //fonksiyonun cornet parametresi ile çalıştı mı
       expect(mockFn).toHaveBeenCalledWith("cornet");
    });
})