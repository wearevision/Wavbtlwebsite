import svgPaths from "./svg-b3dk2cg4ib";
import imgImageGallery from "figma:asset/ac6630c2c90eb5cb96b83053a17b5b06a7082b96.png";
import imgImageGallery1 from "figma:asset/978e2d6e34ba1af4c4657a1849233b9827973133.png";
import imgImageGallery2 from "figma:asset/ba3228fb0c5b9da9ff205bd044a61f346d2a3859.png";
import imgImageGallery3 from "figma:asset/156cddb4be97462faca04b17bd4e513ab95bdbb3.png";

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_8.32%_8.32%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p18641b00} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_29.17%_58.33%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-33.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2dbabc00} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[20.83%] right-[79.17%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[79.17%] right-[20.83%] top-[58.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_58.33%_83.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_70.83%_66.67%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
            <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_33.33%_70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
            <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_54.17%_87.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d="M2.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#8ec5ff] text-[16px] text-nowrap top-[-1px] whitespace-pre">Sistema de Normalización Automática</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[42.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.125px] left-0 not-italic text-[#a1a1a1] text-[13px] top-[0.5px] w-[758px]">Todos los eventos se normalizan automáticamente al guardar. Si tienes eventos legacy en la base de datos, usa el botón de limpieza para generar IDs, slugs, convertir gallery a arrays y eliminar campos no permitidos.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[70.25px] relative shrink-0 w-[768px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[70.25px] items-start relative w-[768px]">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow h-[70.25px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[70.25px] items-start relative w-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[16px] size-[12px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2137_3678)" id="Icon">
          <path d={svgPaths.p1918db00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 3.5L8.5 5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 3V5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 7V9" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1V2" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 4H1.5" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 8H8.5" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 1.5H4.5" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2137_3678">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#155dfc] h-[36px] relative rounded-[6.8px] shrink-0 w-[152.695px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[152.695px]">
        <Icon1 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[86.5px] not-italic text-[12px] text-center text-nowrap text-white top-[10.5px] translate-x-[-50%] whitespace-pre">Normalizar Todos</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="[grid-area:1_/_1] bg-gradient-to-r from-[rgba(22,36,86,0.3)] place-self-stretch relative rounded-[16.4px] shrink-0 to-[rgba(60,3,102,0.3)]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(43,127,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between pb-px pt-[17px] px-[17px] relative size-full">
          <Container2 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.44%_8.34%_12.5%_8.26%]" data-name="Vector">
        <div className="absolute inset-[-5.55%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 17">
            <path d={svgPaths.p31b4080} id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/2 right-1/2 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(251,44,54,0.1)] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#ffa2a2] text-[16px] text-nowrap top-[-1px] whitespace-pre">⚠️ Errores de Validación Detectados</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[12px] text-neutral-300 text-nowrap top-[0.5px] whitespace-pre">Algunos eventos tienen campos incompletos o inválidos. Revisa y corrige los errores antes de guardar.</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[15px] not-italic text-[#a1a1a1] text-[11px] text-nowrap top-[0.5px] whitespace-pre">Verifica que todos los campos obligatorios estén completos (Marca, Título, Descripción, Imagen Principal)</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[15px] not-italic text-[#a1a1a1] text-[11px] text-nowrap top-[0.5px] whitespace-pre">Asegúrate de que las URLs de imágenes sean válidas (HTTPS)</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[15px] not-italic text-[#a1a1a1] text-[11px] text-nowrap top-[0.5px] whitespace-pre">Revisa los contadores de caracteres en cada campo</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[57.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-[113px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[113px] items-start relative w-full">
        <Heading3 />
        <Paragraph1 />
        <List />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(70,8,9,0.3)] h-[31px] relative rounded-[6.8px] shrink-0 w-[162px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[31px] relative w-[162px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-[12px] text-[#ff6467] text-[10px] top-[8px] w-[138px]">1 evento(s) con errores</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="[grid-area:2_/_1] bg-gradient-to-r from-[rgba(70,8,9,0.4)] place-self-stretch relative rounded-[16.4px] shrink-0 to-[rgba(68,19,6,0.4)]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(251,44,54,0.3)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[12px] items-start pb-[2px] pt-[18px] px-[18px] relative size-full">
          <Container4 />
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[31.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[31.336px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[28px]">#1</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[346.492px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Banco de Chile - Neón Banco Chile</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[356.492px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading4 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[58px] relative shrink-0 w-[404.492px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[404.492px]">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard() {
  return (
    <div className="[grid-area:3_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[34.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[34.711px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[31px]">#2</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text1 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[247.898px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Entel - Experiencia Entel</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[257.898px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading5 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[58px] relative shrink-0 w-[305.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[305.898px]">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container15 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard1() {
  return (
    <div className="[grid-area:4_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[35.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[35.422px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[32px]">#3</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text2 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[398.109px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Cencosud - Cumbre Creativa Cencosud</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[408.109px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading6 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[58px] relative shrink-0 w-[456.109px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[456.109px]">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container20 />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard2() {
  return (
    <div className="[grid-area:5_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container22 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[35.867px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[35.867px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[32px]">#4</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text3 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[935.914px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Altra Running - Trail Experience San José de Costa Rica - Producción, PR, Influencers, Difusión.</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[945.914px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Producción, PR, Influencers, Difusión.</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading7 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[58px] relative shrink-0 w-[993.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[993.914px]">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
              <path d={svgPaths.p1b1fa300} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container25 />
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3d150080} id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[218.211px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[218.211px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#ffa2a2] text-[12px] top-[0.5px] w-[219px]">Este evento tiene 1 error de validación</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[rgba(70,8,9,0.3)] box-border content-stretch flex gap-[8px] h-[33px] items-center left-0 pb-px pl-[16px] pr-0 pt-0 top-px w-[1148px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none" />
      <Icon7 />
      <Text4 />
    </div>
  );
}

function Label() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[85.172px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Logo de Marca</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[172px]">Logo de la marca en PNG o SVG con transparencia (opcional)</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute left-[93.17px] size-[12px] top-[2px]" data-name="Container">
      <Icon8 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[105.172px]" data-name="Container">
      <Label />
      <Container30 />
    </div>
  );
}

function ImageBrandLogo() {
  return <div className="absolute left-[132.89px] size-[84.883px] top-[16px]" data-name="Image (Brand Logo)" />;
}

function FileUpload() {
  return <div className="absolute left-[-281.02px] size-0 top-[-360.19px]" data-name="File Upload" />;
}

function Label1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6.8px] shrink-0 w-[72.203px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[72.203px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[12px] not-italic text-[12px] text-black text-nowrap top-[8.5px] whitespace-pre">Cambiar</p>
        <FileUpload />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fb2c36] h-[32px] relative rounded-[6.8px] shrink-0 w-[69.414px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[69.414px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[35px] not-italic text-[12px] text-center text-nowrap text-white top-[8.5px] translate-x-[-50%] whitespace-pre">Eliminar</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] content-stretch flex gap-[8px] h-[116.883px] items-center justify-center left-0 opacity-0 top-0 w-[350.664px]" data-name="Container">
      <Label1 />
      <Button1 />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-neutral-800 h-[116.883px] overflow-clip relative rounded-[6.8px] shrink-0 w-full" data-name="Container">
      <ImageBrandLogo />
      <Container32 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[rgba(38,38,38,0.5)] h-[32px] relative rounded-[6.8px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[8px] py-[4px] relative w-full">
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-neutral-500 text-nowrap whitespace-pre">blob:https://61ff90c7-90c1-4985-beb1-faab8adfa826-v2-figmaiframepreview.figma.site/5a3b9385-74a2-48e1-be2f-52185366013f</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function EventEditorCard3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[156.883px] items-start left-0 top-[24px] w-[350.664px]" data-name="EventEditorCard">
      <Container33 />
      <TextInput />
    </div>
  );
}

function FormField() {
  return (
    <div className="h-[180.883px] relative shrink-0 w-full" data-name="FormField">
      <Container31 />
      <EventEditorCard3 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[14.5px] items-start left-[98.94px] top-[0.5px] w-[6.266px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#ff6467] text-[12px] text-nowrap whitespace-pre">*</p>
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[105.203px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#ff6467] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Imagen Principal</p>
      <Text5 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[237px]">URL de la imagen principal del evento (obligatorio, formato HTTPS)</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute left-[113.2px] size-[12px] top-[2px]" data-name="Container">
      <Icon9 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[125.203px]" data-name="Container">
      <Label2 />
      <Container35 />
    </div>
  );
}

function ImagePreview() {
  return <div className="absolute h-[197.242px] left-0 top-0 w-[350.664px]" data-name="Image (Preview)" />;
}

function FileUpload1() {
  return <div className="absolute left-[-319.73px] size-0 top-[-597.25px]" data-name="File Upload" />;
}

function Label3() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6.8px] shrink-0 w-[72.203px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[72.203px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[12px] not-italic text-[12px] text-black text-nowrap top-[8.5px] whitespace-pre">Cambiar</p>
        <FileUpload1 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] box-border content-stretch flex h-[197.242px] items-center justify-center left-0 opacity-0 pl-0 pr-[0.008px] py-0 top-0 w-[350.664px]" data-name="Container">
      <Label3 />
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-neutral-800 h-[197.242px] overflow-clip relative rounded-[6.8px] shrink-0 w-full" data-name="Container">
      <ImagePreview />
      <Container37 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[rgba(38,38,38,0.5)] h-[32px] relative rounded-[6.8px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[8px] py-[4px] relative w-full">
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-neutral-500 text-nowrap whitespace-pre">blob:https://61ff90c7-90c1-4985-beb1-faab8adfa826-v2-figmaiframepreview.figma.site/56596beb-d648-4168-a44c-49dbd1875098</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function EventEditorCard4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[237.242px] items-start left-0 top-[24px] w-[350.664px]" data-name="EventEditorCard">
      <Container38 />
      <TextInput1 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2137_3643)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4V6" id="Vector_2" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8H6.005" id="Vector_3" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2137_3643">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[121.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[121.031px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#ff6467] text-[11px] text-nowrap top-[0.5px] whitespace-pre">URL de imagen inválida</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16.5px] items-center left-0 top-[269.24px] w-[350.664px]" data-name="Container">
      <Icon10 />
      <Text6 />
    </div>
  );
}

function FormField1() {
  return (
    <div className="h-[285.742px] relative shrink-0 w-full" data-name="FormField">
      <Container36 />
      <EventEditorCard4 />
      <Container39 />
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[106.789px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Galería Multimedia</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[216px]">Galería multimedia con imágenes y videos del proyecto</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute left-[114.79px] size-[12px] top-[2px]" data-name="Container">
      <Icon11 />
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[126.789px]" data-name="Container">
      <Label4 />
      <Container41 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[44.77px] size-[20px] top-[35.27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 2.5V12.5" id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p320a7e80} id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3053b100} id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[15px] left-[42.29px] top-[59.27px] w-[24.977px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[10px] text-neutral-500 text-nowrap top-[0.5px] whitespace-pre">Subir</p>
    </div>
  );
}

function FileUpload2() {
  return <div className="absolute left-[-301.05px] size-0 top-[-936.93px]" data-name="File Upload" />;
}

function Label5() {
  return (
    <div className="absolute bg-neutral-800 border border-neutral-700 border-solid left-[119.55px] rounded-[6.8px] size-[111.555px] top-[119.55px]" data-name="Label">
      <Icon12 />
      <Text7 />
      <FileUpload2 />
    </div>
  );
}

function ImageGallery() {
  return (
    <div className="absolute left-0 size-[111.555px] top-0" data-name="Image (Gallery)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageGallery} />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p16756d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p31427a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
        <div className="absolute inset-[-10.34%_-6.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p376a8200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] box-border content-stretch flex flex-col h-[16px] items-start left-[4px] pb-0 pt-[2px] px-[4px] rounded-[4px] top-[91.55px] w-[20px]" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M6.5 0.5L0.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M0.5 0.5L6.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(251,44,54,0.8)] box-border content-stretch flex flex-col items-start left-[87.55px] opacity-0 pb-0 pt-[4px] px-[4px] rounded-[1.67772e+07px] size-[20px] top-[4px]" data-name="Button">
      <Icon14 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute bg-neutral-800 left-0 overflow-clip rounded-[6.8px] size-[111.555px] top-0" data-name="Container">
      <ImageGallery />
      <Container43 />
      <Button2 />
    </div>
  );
}

function ImageGallery1() {
  return (
    <div className="absolute left-0 size-[111.555px] top-0" data-name="Image (Gallery)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageGallery1} />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p16756d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p31427a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
        <div className="absolute inset-[-10.34%_-6.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p376a8200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] box-border content-stretch flex flex-col h-[16px] items-start left-[4px] pb-0 pt-[2px] px-[4px] rounded-[4px] top-[91.55px] w-[20px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M6.5 0.5L0.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M0.5 0.5L6.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[rgba(251,44,54,0.8)] box-border content-stretch flex flex-col items-start left-[87.55px] opacity-0 pb-0 pt-[4px] px-[4px] rounded-[1.67772e+07px] size-[20px] top-[4px]" data-name="Button">
      <Icon16 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bg-neutral-800 left-[119.55px] overflow-clip rounded-[6.8px] size-[111.555px] top-0" data-name="Container">
      <ImageGallery1 />
      <Container45 />
      <Button3 />
    </div>
  );
}

function ImageGallery2() {
  return (
    <div className="absolute left-0 size-[111.555px] top-0" data-name="Image (Gallery)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageGallery2} />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p16756d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p31427a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
        <div className="absolute inset-[-10.34%_-6.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p376a8200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] box-border content-stretch flex flex-col h-[16px] items-start left-[4px] pb-0 pt-[2px] px-[4px] rounded-[4px] top-[91.55px] w-[20px]" data-name="Container">
      <Icon17 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M6.5 0.5L0.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M0.5 0.5L6.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(251,44,54,0.8)] box-border content-stretch flex flex-col items-start left-[87.55px] opacity-0 pb-0 pt-[4px] px-[4px] rounded-[1.67772e+07px] size-[20px] top-[4px]" data-name="Button">
      <Icon18 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-neutral-800 left-[239.11px] overflow-clip rounded-[6.8px] size-[111.555px] top-0" data-name="Container">
      <ImageGallery2 />
      <Container47 />
      <Button4 />
    </div>
  );
}

function ImageGallery3() {
  return (
    <div className="absolute left-0 size-[111.555px] top-0" data-name="Image (Gallery)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageGallery3} />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p16756d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p31427a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
        <div className="absolute inset-[-10.34%_-6.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p376a8200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] box-border content-stretch flex flex-col h-[16px] items-start left-[4px] pb-0 pt-[2px] px-[4px] rounded-[4px] top-[91.55px] w-[20px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M6.5 0.5L0.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M0.5 0.5L6.5 6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[rgba(251,44,54,0.8)] box-border content-stretch flex flex-col items-start left-[87.55px] opacity-0 pb-0 pt-[4px] px-[4px] rounded-[1.67772e+07px] size-[20px] top-[4px]" data-name="Button">
      <Icon20 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-neutral-800 left-0 overflow-clip rounded-[6.8px] size-[111.555px] top-[119.55px]" data-name="Container">
      <ImageGallery3 />
      <Container49 />
      <Button5 />
    </div>
  );
}

function EventEditorCard5() {
  return (
    <div className="absolute h-[231.109px] left-0 top-[24px] w-[350.664px]" data-name="EventEditorCard">
      <Label5 />
      <Container44 />
      <Container46 />
      <Container48 />
      <Container50 />
    </div>
  );
}

function FormField2() {
  return (
    <div className="h-[255.109px] relative shrink-0 w-full" data-name="FormField">
      <Container42 />
      <EventEditorCard5 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[1069.5px] items-start left-0 top-0 w-[350.664px]" data-name="Container">
      <FormField />
      <FormField1 />
      <FormField2 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M8.33333 9.16667V14.1667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M11.6667 9.16667V14.1667" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3bbb0f80} id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 5H17.5" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3ba73400} id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[6.8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon21 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="box-border content-stretch flex h-[53px] items-start justify-end pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-neutral-800 border-solid inset-0 pointer-events-none" />
      <Button6 />
    </div>
  );
}

function Label6() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[35.625px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Marca</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[230px]">Nombre de la marca o cliente del proyecto (máx. 50 caracteres)</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute left-[43.63px] size-[12px] top-[2px]" data-name="Container">
      <Icon22 />
      <Container53 />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[16px] relative shrink-0 w-[55.625px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[55.625px]">
        <Label6 />
        <Container54 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-full">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-0 text-[10px] text-neutral-500 top-0 w-[30px]">13/50</p>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27508)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27508">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[15px] relative shrink-0 w-[50px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[15px] items-center relative w-[50px]">
        <Text8 />
        <Icon23 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container56 />
    </div>
  );
}

function EventEditorCard6() {
  return (
    <div className="bg-neutral-800 h-[36px] relative rounded-[6.8px] shrink-0 w-full" data-name="EventEditorCard">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap whitespace-pre">Altra Running</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function FormField3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="FormField">
      <Container57 />
      <EventEditorCard6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[96.148px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Título del Evento</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[224px]">Título descriptivo del evento o campaña (5-100 caracteres)</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute left-[104.15px] size-[12px] top-[2px]" data-name="Container">
      <Icon24 />
      <Container58 />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[16px] relative shrink-0 w-[116.148px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[116.148px]">
        <Label7 />
        <Container59 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-full">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-0 text-[10px] text-neutral-500 top-0 w-[36px]">39/100</p>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27508)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27508">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[15px] relative shrink-0 w-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[15px] items-center relative w-[56px]">
        <Text9 />
        <Icon25 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function EventEditorCard7() {
  return (
    <div className="bg-neutral-800 h-[40px] relative rounded-[6.8px] shrink-0 w-full" data-name="EventEditorCard">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[40px] items-center px-[12px] py-[8px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.5)] text-nowrap whitespace-pre">Trail Experience San José de Costa Rica</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function FormField4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[64px] items-start relative shrink-0 w-full" data-name="FormField">
      <Container62 />
      <EventEditorCard7 />
    </div>
  );
}

function Label8() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[56.172px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Categoría</p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[237px]">Categoría del evento (Ej: Lanzamiento, Activación, Showroom)</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute left-[64.17px] size-[12px] top-[2px]" data-name="Container">
      <Icon26 />
      <Container63 />
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[16px] relative shrink-0 w-[76.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[76.172px]">
        <Label8 />
        <Container64 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-full">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-0 text-[10px] text-neutral-500 top-0 w-[30px]">38/50</p>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27508)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27508">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[15px] relative shrink-0 w-[50px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[15px] items-center relative w-[50px]">
        <Text10 />
        <Icon27 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function EventEditorCard8() {
  return (
    <div className="bg-neutral-800 h-[36px] relative rounded-[6.8px] shrink-0 w-full" data-name="EventEditorCard">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap whitespace-pre">Producción, PR, Influencers, Difusión.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function FormField5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="FormField">
      <Container67 />
      <EventEditorCard8 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-9.09%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 7">
            <path d="M8.5 0.5L3 6L0.5 3.5" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] relative rounded-[4px] shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-[4px] relative size-[20px]">
        <Icon28 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#8ec5ff] text-[10px] text-nowrap top-[0.5px] tracking-[0.5px] uppercase whitespace-pre">Slug Generado Automáticamente</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['JetBrains_Mono:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[12px] text-blue-100">altra-running-trail-experience-san-jose-de-costa-rica</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="basis-0 grow h-[35px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[35px] items-start relative w-full">
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="bg-[rgba(22,36,86,0.2)] h-[61px] relative rounded-[6.8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(43,127,255,0.2)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[61px] items-start pb-px pt-[13px] px-[13px] relative w-full">
          <Container68 />
          <Container69 />
        </div>
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[68.156px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Descripción</p>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[232px]">Descripción detallada del proyecto BTL (20-1000 caracteres)</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute left-[76.16px] size-[12px] top-[2px]" data-name="Container">
      <Icon29 />
      <Container71 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[16px] relative shrink-0 w-[88.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[88.156px]">
        <Label9 />
        <Container72 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-full">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-0 text-[10px] text-neutral-500 top-0 w-[48px]">739/1000</p>
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27508)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27508">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[15px] relative shrink-0 w-[68px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[15px] items-center relative w-[68px]">
        <Text11 />
        <Icon30 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container74 />
    </div>
  );
}

function EventEditorCard9() {
  return (
    <div className="bg-neutral-800 h-[120px] relative rounded-[6.8px] shrink-0 w-full" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[120px] items-start px-[12px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap whitespace-pre">Descripción detallada del proyecto, tecnologías usadas, resultados...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function FormField6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[144px] items-start relative shrink-0 w-full" data-name="FormField">
      <Container75 />
      <EventEditorCard9 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-[0.5px] tracking-[0.6px] uppercase whitespace-pre">{`Contenido Avanzado & SEO (IA)`}</p>
    </div>
  );
}

function Label10() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[108.945px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Highlights (Bullets)</p>
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[34.25px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 text-nowrap top-[8px] whitespace-pre">Puntos clave del proyecto</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute left-[116.95px] size-[12px] top-[2px]" data-name="Container">
      <Icon31 />
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[128.945px]" data-name="Container">
      <Label10 />
      <Container77 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M10 3L4.5 8.5L2 6" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function EventEditorCard10() {
  return (
    <div className="absolute h-[16px] left-0 top-[24px] w-[116.75px]" data-name="EventEditorCard">
      <Icon32 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[66.5px] not-italic text-[#f6339a] text-[12px] text-center text-nowrap top-[0.5px] translate-x-[-50%] whitespace-pre">Agregar Highlight</p>
    </div>
  );
}

function FormField7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="FormField">
      <Container78 />
      <EventEditorCard10 />
    </div>
  );
}

function Label11() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[83.734px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Keywords SEO</p>
    </div>
  );
}

function Icon33() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[34.25px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 text-nowrap top-[8px] whitespace-pre">Separadas por coma</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute left-[91.73px] size-[12px] top-[2px]" data-name="Container">
      <Icon33 />
      <Container79 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[103.734px]" data-name="Container">
      <Label11 />
      <Container80 />
    </div>
  );
}

function EventEditorCard11() {
  return (
    <div className="absolute bg-neutral-800 h-[60px] left-0 rounded-[4px] top-[24px] w-[354.664px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex h-[60px] items-start overflow-clip px-[8px] py-[4px] relative rounded-[inherit] w-[354.664px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(212,212,212,0.5)] text-nowrap whitespace-pre">marketing, btl, eventos...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function FormField8() {
  return (
    <div className="absolute h-[90.5px] left-0 top-0 w-[354.664px]" data-name="FormField">
      <Container81 />
      <EventEditorCard11 />
    </div>
  );
}

function Label12() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[115.805px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Hashtags Generales</p>
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[34.25px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 text-nowrap top-[8px] whitespace-pre">Separados por coma o espacio</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute left-[123.8px] size-[12px] top-[2px]" data-name="Container">
      <Icon34 />
      <Container82 />
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[135.805px]" data-name="Container">
      <Label12 />
      <Container83 />
    </div>
  );
}

function EventEditorCard12() {
  return (
    <div className="absolute bg-neutral-800 h-[60px] left-0 rounded-[4px] top-[24px] w-[354.672px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex h-[60px] items-start overflow-clip px-[8px] py-[4px] relative rounded-[inherit] w-[354.672px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(212,212,212,0.5)] text-nowrap whitespace-pre">#evento #btl...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function FormField9() {
  return (
    <div className="absolute h-[90.5px] left-[370.66px] top-0 w-[354.672px]" data-name="FormField">
      <Container84 />
      <EventEditorCard12 />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[90.5px] relative shrink-0 w-full" data-name="Container">
      <FormField8 />
      <FormField9 />
    </div>
  );
}

function Label13() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[90.727px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Instagram Copy</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="bg-neutral-800 h-[26px] relative rounded-[4px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[26px] items-center px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-nowrap whitespace-pre">Hook</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TextArea() {
  return (
    <div className="bg-neutral-800 h-[80px] relative rounded-[4px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[80px] items-start px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(212,212,212,0.5)] text-nowrap whitespace-pre">Cuerpo del post...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TextInput3() {
  return (
    <div className="bg-neutral-800 h-[26px] relative rounded-[4px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[26px] items-center px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(251,100,182,0.5)] text-nowrap whitespace-pre">Hashtags específicos</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function EventEditorCard13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[152px] items-start left-0 top-[24px] w-[354.664px]" data-name="EventEditorCard">
      <TextInput2 />
      <TextArea />
      <TextInput3 />
    </div>
  );
}

function FormField10() {
  return (
    <div className="absolute h-[200px] left-0 top-0 w-[354.664px]" data-name="FormField">
      <Label13 />
      <EventEditorCard13 />
    </div>
  );
}

function Label14() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[83.5px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">LinkedIn Posts</p>
    </div>
  );
}

function TextArea1() {
  return (
    <div className="bg-neutral-800 h-[80px] relative rounded-[4px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[80px] items-start px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(212,212,212,0.5)] text-nowrap whitespace-pre">Post Corto LinkedIn...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TextArea2() {
  return (
    <div className="bg-neutral-800 h-[80px] relative rounded-[4px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[80px] items-start px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(212,212,212,0.5)] text-nowrap whitespace-pre">Artículo Largo LinkedIn...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function EventEditorCard14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[176px] items-start left-0 top-[24px] w-[354.672px]" data-name="EventEditorCard">
      <TextArea1 />
      <TextArea2 />
    </div>
  );
}

function FormField11() {
  return (
    <div className="absolute h-[200px] left-[370.66px] top-0 w-[354.672px]" data-name="FormField">
      <Label14 />
      <EventEditorCard14 />
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[200px] relative shrink-0 w-full" data-name="Container">
      <FormField10 />
      <FormField11 />
    </div>
  );
}

function Label15() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[169.773px]" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Metadatos IA (SEO/Resumen)</p>
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2121_27544)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8V6" id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4H6.005" id="Vector_3" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2121_27544">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute bg-black border border-neutral-700 border-solid h-[50.5px] left-0 opacity-0 rounded-[6.8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20px] w-[256px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.25px] left-[8px] not-italic text-[10px] text-neutral-300 top-[8px] w-[224px]">Resumen generado por IA para optimización de búsqueda</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute left-[177.77px] size-[12px] top-[2px]" data-name="Container">
      <Icon35 />
      <Container87 />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[189.773px]" data-name="Container">
      <Label15 />
      <Container88 />
    </div>
  );
}

function EventEditorCard15() {
  return (
    <div className="absolute bg-[rgba(22,36,86,0.1)] h-[80px] left-0 rounded-[6.8px] top-[24px] w-[725.336px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex h-[80px] items-start overflow-clip px-[12px] py-[8px] relative rounded-[inherit] w-[725.336px]">
        <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(190,219,255,0.5)] text-nowrap whitespace-pre">Resumen técnico para SEO...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function FormField12() {
  return (
    <div className="h-[104px] relative shrink-0 w-full" data-name="FormField">
      <Container89 />
      <EventEditorCard15 />
    </div>
  );
}

function Container90() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] h-[531.5px] items-start pb-0 pt-[17px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-neutral-800 border-solid inset-0 pointer-events-none" />
      <Heading2 />
      <FormField7 />
      <Container85 />
      <Container86 />
      <FormField12 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[1069.5px] items-start left-[374.66px] top-0 w-[725.336px]" data-name="Container">
      <Container52 />
      <FormField3 />
      <FormField4 />
      <FormField5 />
      <Container70 />
      <FormField6 />
      <Container90 />
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute h-[1069.5px] left-[24px] top-[58px] w-[1100px]" data-name="Container">
      <Container51 />
      <Container91 />
    </div>
  );
}

function Container93() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] h-[1151.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-neutral-800 border-solid inset-0 pointer-events-none" />
      <Container28 />
      <Container92 />
    </div>
  );
}

function EventEditorCard16() {
  return (
    <div className="[grid-area:6_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container27 />
          <Container93 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(251,44,54,0.5)] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[35.07px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[35.07px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[32px]">#5</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text12 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[503.719px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Concha y Toro - Experiencia Sonora Concha y Toro</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[513.719px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading8 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[58px] relative shrink-0 w-[561.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[561.719px]">
        <Container94 />
        <Container95 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon36 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container96 />
          <Container97 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard17() {
  return (
    <div className="[grid-area:7_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container98 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[35.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[35.445px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[32px]">#6</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text13 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[286.891px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Redbull - Night Expo Redbull</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[296.891px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading9 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[58px] relative shrink-0 w-[344.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[344.891px]">
        <Container99 />
        <Container100 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon37 />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container101 />
          <Container102 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard18() {
  return (
    <div className="[grid-area:8_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container103 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[33.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[33.875px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[30px]">#7</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text14 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[384.609px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Movistar - Lanzamiento Tech Movistar</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[394.609px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container105() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading10 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="h-[58px] relative shrink-0 w-[442.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[442.609px]">
        <Container104 />
        <Container105 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon38 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container106 />
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard19() {
  return (
    <div className="[grid-area:9_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container108 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[35.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[35.453px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[32px]">#8</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text15 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[300.648px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">SQM - Showroom Futuro SQM</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[310.648px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container110() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading11 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[58px] relative shrink-0 w-[358.648px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[358.648px]">
        <Container109 />
        <Container110 />
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon39 />
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container111 />
          <Container112 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard20() {
  return (
    <div className="[grid-area:10_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container113 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[35.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[35.445px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[32px]">#9</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text16 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[324px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">CCU - Ecosistema Creativo CCU</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[334px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container115() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading12 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[58px] relative shrink-0 w-[382px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[382px]">
        <Container114 />
        <Container115 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container116 />
          <Container117 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard21() {
  return (
    <div className="[grid-area:11_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container118 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.852px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.852px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#10</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text17 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[307.07px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">WOM - Noche del Futuro WOM</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[317.07px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container120() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading13 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[58px] relative shrink-0 w-[365.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[365.07px]">
        <Container119 />
        <Container120 />
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container121 />
          <Container122 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard22() {
  return (
    <div className="[grid-area:12_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container123 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[43.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[43.078px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[40px]">#11</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text18 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[320.398px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Paris - Experiencia Electro Paris</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[330.398px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container125() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading14 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="h-[58px] relative shrink-0 w-[378.398px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[378.398px]">
        <Container124 />
        <Container125 />
      </div>
    </div>
  );
}

function Icon42() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon42 />
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container126 />
          <Container127 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard23() {
  return (
    <div className="[grid-area:13_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container128 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[46.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[46.453px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[43px]">#12</p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text19 />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[296.883px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Ripley - Ritual Creativo Ripley</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[306.883px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container130() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading15 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="h-[58px] relative shrink-0 w-[354.883px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[354.883px]">
        <Container129 />
        <Container130 />
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon43 />
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container131 />
          <Container132 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard24() {
  return (
    <div className="[grid-area:14_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container133 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.164px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.164px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#13</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text20 />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[433.133px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Multinacional Chile - Summit Digital LATAM</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[443.133px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading16 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="h-[58px] relative shrink-0 w-[491.133px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[491.133px]">
        <Container134 />
        <Container135 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon44 />
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container136 />
          <Container137 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard25() {
  return (
    <div className="[grid-area:15_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container138 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.609px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#14</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text21 />
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[202.945px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Didi - Live Expo Didi</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[212.945px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container140() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading17 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[58px] relative shrink-0 w-[260.945px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[260.945px]">
        <Container139 />
        <Container140 />
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon45 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container141 />
          <Container142 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard26() {
  return (
    <div className="[grid-area:16_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container143 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[46.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[46.813px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[43px]">#15</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text22 />
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[455.273px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Cornershop - Showcase Creativo Cornershop</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[465.273px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container145() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading18 />
        <Paragraph18 />
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[58px] relative shrink-0 w-[513.273px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[513.273px]">
        <Container144 />
        <Container145 />
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container147() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon46 />
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container146 />
          <Container147 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard27() {
  return (
    <div className="[grid-area:17_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container148 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.188px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#16</p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text23 />
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[551.688px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Antofagasta Minerals - Vibe Expo Antofagasta Minerals</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[561.688px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container150() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading19 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="h-[58px] relative shrink-0 w-[609.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[609.688px]">
        <Container149 />
        <Container150 />
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon47 />
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container151 />
          <Container152 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard28() {
  return (
    <div className="[grid-area:18_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container153 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[45.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[45.617px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[42px]">#17</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text24 />
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[406.836px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Sernatur - Experiencia Creativa Sernatur</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[416.836px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container155() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading20 />
        <Paragraph20 />
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[58px] relative shrink-0 w-[464.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[464.836px]">
        <Container154 />
        <Container155 />
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon48 />
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container156 />
          <Container157 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard29() {
  return (
    <div className="[grid-area:19_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container158 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.195px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.195px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#18</p>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text25 />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[388.719px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Metrogas - Encuentro Digital Metrogas</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[398.719px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container160() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading21 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Container161() {
  return (
    <div className="h-[58px] relative shrink-0 w-[446.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[446.719px]">
        <Container159 />
        <Container160 />
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon49 />
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container161 />
          <Container162 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard30() {
  return (
    <div className="[grid-area:20_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container163 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.188px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#19</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text26 />
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[509.914px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Clínica Alemana - Expo Innovación Clínica Alemana</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[519.914px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container165() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading22 />
        <Paragraph22 />
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[58px] relative shrink-0 w-[567.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[567.914px]">
        <Container164 />
        <Container165 />
      </div>
    </div>
  );
}

function Icon50() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon50 />
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container166 />
          <Container167 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard31() {
  return (
    <div className="[grid-area:21_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container168 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.227px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#20</p>
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text27 />
      </div>
    </div>
  );
}

function Heading23() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[263.484px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">ISL - Atmósfera Digital ISL</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[273.484px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container170() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading23 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="h-[58px] relative shrink-0 w-[321.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[321.484px]">
        <Container169 />
        <Container170 />
      </div>
    </div>
  );
}

function Icon51() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon51 />
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container171 />
          <Container172 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard32() {
  return (
    <div className="[grid-area:22_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container173 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[46.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[46.453px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[43px]">#21</p>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text28 />
      </div>
    </div>
  );
}

function Heading24() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[298.547px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">ACHS - Evento Cultural ACHS</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[308.547px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading24 />
        <Paragraph24 />
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="h-[58px] relative shrink-0 w-[356.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[356.547px]">
        <Container174 />
        <Container175 />
      </div>
    </div>
  );
}

function Icon52() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container177() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon52 />
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container176 />
          <Container177 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard33() {
  return (
    <div className="[grid-area:23_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container178 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[49.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[49.828px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[46px]">#22</p>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text29 />
      </div>
    </div>
  );
}

function Heading25() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[442.727px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">FinTech Chile - Expo de Futuro FinTech Chile</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[452.727px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container180() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading25 />
        <Paragraph25 />
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="h-[58px] relative shrink-0 w-[500.727px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[500.727px]">
        <Container179 />
        <Container180 />
      </div>
    </div>
  );
}

function Icon53() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon53 />
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container181 />
          <Container182 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard34() {
  return (
    <div className="[grid-area:24_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container183 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.539px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.539px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#23</p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text30 />
      </div>
    </div>
  );
}

function Heading26() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[428.773px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Metro de Santiago - BTL Metro de Santiago</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[438.773px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container185() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading26 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="h-[58px] relative shrink-0 w-[486.773px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[486.773px]">
        <Container184 />
        <Container185 />
      </div>
    </div>
  );
}

function Icon54() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container187() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon54 />
      </div>
    </div>
  );
}

function Container188() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container186 />
          <Container187 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard35() {
  return (
    <div className="[grid-area:25_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container188 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.609px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#24</p>
      </div>
    </div>
  );
}

function Container189() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text31 />
      </div>
    </div>
  );
}

function Heading27() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[348.242px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Carozzi - Cumbre Creativa Carozzi</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[358.242px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container190() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading27 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="h-[58px] relative shrink-0 w-[406.242px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[406.242px]">
        <Container189 />
        <Container190 />
      </div>
    </div>
  );
}

function Icon55() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon55 />
      </div>
    </div>
  );
}

function Container193() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container191 />
          <Container192 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard36() {
  return (
    <div className="[grid-area:26_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container193 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.188px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#25</p>
      </div>
    </div>
  );
}

function Container194() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text32 />
      </div>
    </div>
  );
}

function Heading28() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[361.484px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Sodimac - Noche de Marca Sodimac</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[371.484px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container195() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading28 />
        <Paragraph28 />
      </div>
    </div>
  );
}

function Container196() {
  return (
    <div className="h-[58px] relative shrink-0 w-[419.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[419.484px]">
        <Container194 />
        <Container195 />
      </div>
    </div>
  );
}

function Icon56() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container197() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon56 />
      </div>
    </div>
  );
}

function Container198() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container196 />
          <Container197 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard37() {
  return (
    <div className="[grid-area:27_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container198 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.563px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#26</p>
      </div>
    </div>
  );
}

function Container199() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text33 />
      </div>
    </div>
  );
}

function Heading29() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[313.086px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Copec - Interfaz Urbana Copec</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[323.086px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container200() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading29 />
        <Paragraph29 />
      </div>
    </div>
  );
}

function Container201() {
  return (
    <div className="h-[58px] relative shrink-0 w-[371.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[371.086px]">
        <Container199 />
        <Container200 />
      </div>
    </div>
  );
}

function Icon57() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container202() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon57 />
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container201 />
          <Container202 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard38() {
  return (
    <div className="[grid-area:28_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container203 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[48.992px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[48.992px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[45px]">#27</p>
      </div>
    </div>
  );
}

function Container204() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text34 />
      </div>
    </div>
  );
}

function Heading30() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[300.133px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Enel - Experiencia Digital Enel</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[310.133px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container205() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading30 />
        <Paragraph30 />
      </div>
    </div>
  );
}

function Container206() {
  return (
    <div className="h-[58px] relative shrink-0 w-[358.133px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[358.133px]">
        <Container204 />
        <Container205 />
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container207() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon58 />
      </div>
    </div>
  );
}

function Container208() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container206 />
          <Container207 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard39() {
  return (
    <div className="[grid-area:29_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container208 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.57px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#28</p>
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text35 />
      </div>
    </div>
  );
}

function Heading31() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[482.523px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">LATAM Airlines - Noche Creativa LATAM Airlines</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[492.523px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container210() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading31 />
        <Paragraph31 />
      </div>
    </div>
  );
}

function Container211() {
  return (
    <div className="h-[58px] relative shrink-0 w-[540.523px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[540.523px]">
        <Container209 />
        <Container210 />
      </div>
    </div>
  );
}

function Icon59() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container212() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon59 />
      </div>
    </div>
  );
}

function Container213() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container211 />
          <Container212 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard40() {
  return (
    <div className="[grid-area:30_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container213 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.563px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#29</p>
      </div>
    </div>
  );
}

function Container214() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text36 />
      </div>
    </div>
  );
}

function Heading32() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[675.219px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Municipalidad de Santiago - Expo Urbana Municipalidad de Santiago</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[685.219px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container215() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading32 />
        <Paragraph32 />
      </div>
    </div>
  );
}

function Container216() {
  return (
    <div className="h-[58px] relative shrink-0 w-[733.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[733.219px]">
        <Container214 />
        <Container215 />
      </div>
    </div>
  );
}

function Icon60() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container217() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon60 />
      </div>
    </div>
  );
}

function Container218() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container216 />
          <Container217 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard41() {
  return (
    <div className="[grid-area:31_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container218 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.938px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#30</p>
      </div>
    </div>
  );
}

function Container219() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text37 />
      </div>
    </div>
  );
}

function Heading33() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[322.898px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">UDD - Experiencia Creativa UDD</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[332.898px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container220() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading33 />
        <Paragraph33 />
      </div>
    </div>
  );
}

function Container221() {
  return (
    <div className="h-[58px] relative shrink-0 w-[380.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[380.898px]">
        <Container219 />
        <Container220 />
      </div>
    </div>
  );
}

function Icon61() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container222() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon61 />
      </div>
    </div>
  );
}

function Container223() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container221 />
          <Container222 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard42() {
  return (
    <div className="[grid-area:32_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container223 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.164px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.164px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#31</p>
      </div>
    </div>
  );
}

function Container224() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text38 />
      </div>
    </div>
  );
}

function Heading34() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[333.602px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Sony Music - Neon Beats Festival</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[343.602px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container225() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading34 />
        <Paragraph34 />
      </div>
    </div>
  );
}

function Container226() {
  return (
    <div className="h-[58px] relative shrink-0 w-[391.602px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[391.602px]">
        <Container224 />
        <Container225 />
      </div>
    </div>
  );
}

function Icon62() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container227() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon62 />
      </div>
    </div>
  );
}

function Container228() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container226 />
          <Container227 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard43() {
  return (
    <div className="[grid-area:33_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container228 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.539px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.539px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#32</p>
      </div>
    </div>
  );
}

function Container229() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text39 />
      </div>
    </div>
  );
}

function Heading35() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[262.977px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Spotify - Radar Live Stage</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[272.977px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container230() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading35 />
        <Paragraph35 />
      </div>
    </div>
  );
}

function Container231() {
  return (
    <div className="h-[58px] relative shrink-0 w-[320.977px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[320.977px]">
        <Container229 />
        <Container230 />
      </div>
    </div>
  );
}

function Icon63() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container232() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon63 />
      </div>
    </div>
  );
}

function Container233() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container231 />
          <Container232 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard44() {
  return (
    <div className="[grid-area:34_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container233 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.25px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#33</p>
      </div>
    </div>
  );
}

function Container234() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text40 />
      </div>
    </div>
  );
}

function Heading36() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[266.898px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Vogue - Fashion Night Out</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[276.898px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container235() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading36 />
        <Paragraph36 />
      </div>
    </div>
  );
}

function Container236() {
  return (
    <div className="h-[58px] relative shrink-0 w-[324.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[324.898px]">
        <Container234 />
        <Container235 />
      </div>
    </div>
  );
}

function Icon64() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container237() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon64 />
      </div>
    </div>
  );
}

function Container238() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container236 />
          <Container237 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard45() {
  return (
    <div className="[grid-area:35_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container238 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.688px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#34</p>
      </div>
    </div>
  );
}

function Container239() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text41 />
      </div>
    </div>
  );
}

function Heading37() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[350.141px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Samsung - Galaxy Unpacked Show</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[360.141px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container240() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading37 />
        <Paragraph37 />
      </div>
    </div>
  );
}

function Container241() {
  return (
    <div className="h-[58px] relative shrink-0 w-[408.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[408.141px]">
        <Container239 />
        <Container240 />
      </div>
    </div>
  );
}

function Icon65() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container242() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon65 />
      </div>
    </div>
  );
}

function Container243() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container241 />
          <Container242 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard46() {
  return (
    <div className="[grid-area:36_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container243 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.891px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#35</p>
      </div>
    </div>
  );
}

function Container244() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text42 />
      </div>
    </div>
  );
}

function Heading38() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[324.406px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">MoMA - Interactive Light Exhibit</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[334.406px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container245() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading38 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function Container246() {
  return (
    <div className="h-[58px] relative shrink-0 w-[382.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[382.406px]">
        <Container244 />
        <Container245 />
      </div>
    </div>
  );
}

function Icon66() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container247() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon66 />
      </div>
    </div>
  );
}

function Container248() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container246 />
          <Container247 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard47() {
  return (
    <div className="[grid-area:37_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container248 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.266px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#36</p>
      </div>
    </div>
  );
}

function Container249() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text43 />
      </div>
    </div>
  );
}

function Heading39() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[328.336px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">TeamLab - Borderless Projection</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[338.336px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container250() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading39 />
        <Paragraph39 />
      </div>
    </div>
  );
}

function Container251() {
  return (
    <div className="h-[58px] relative shrink-0 w-[386.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[386.336px]">
        <Container249 />
        <Container250 />
      </div>
    </div>
  );
}

function Icon67() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container252() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon67 />
      </div>
    </div>
  );
}

function Container253() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container251 />
          <Container252 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard48() {
  return (
    <div className="[grid-area:38_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container253 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[49.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[49.703px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[46px]">#37</p>
      </div>
    </div>
  );
}

function Container254() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text44 />
      </div>
    </div>
  );
}

function Heading40() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[223.438px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Nike - Cyberpunk Run</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[233.438px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container255() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading40 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Container256() {
  return (
    <div className="h-[58px] relative shrink-0 w-[281.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[281.438px]">
        <Container254 />
        <Container255 />
      </div>
    </div>
  );
}

function Icon68() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container257() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon68 />
      </div>
    </div>
  );
}

function Container258() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container256 />
          <Container257 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard49() {
  return (
    <div className="[grid-area:39_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container258 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.281px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#38</p>
      </div>
    </div>
  );
}

function Container259() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text45 />
      </div>
    </div>
  );
}

function Heading41() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[332.234px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Twitch - Streamer Awards Purple</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[342.234px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container260() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading41 />
        <Paragraph41 />
      </div>
    </div>
  );
}

function Container261() {
  return (
    <div className="h-[58px] relative shrink-0 w-[390.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[390.234px]">
        <Container259 />
        <Container260 />
      </div>
    </div>
  );
}

function Icon69() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container262() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon69 />
      </div>
    </div>
  );
}

function Container263() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container261 />
          <Container262 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard50() {
  return (
    <div className="[grid-area:40_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container263 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.266px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#39</p>
      </div>
    </div>
  );
}

function Container264() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text46 />
      </div>
    </div>
  );
}

function Heading42() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[333.422px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Tomorrowland - Laser Symphony</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[343.422px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container265() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading42 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container266() {
  return (
    <div className="h-[58px] relative shrink-0 w-[391.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[391.422px]">
        <Container264 />
        <Container265 />
      </div>
    </div>
  );
}

function Icon70() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container267() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon70 />
      </div>
    </div>
  );
}

function Container268() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container266 />
          <Container267 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard51() {
  return (
    <div className="[grid-area:41_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container268 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[52.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[52.383px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[49px]">#40</p>
      </div>
    </div>
  );
}

function Container269() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text47 />
      </div>
    </div>
  );
}

function Heading43() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[242.969px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">IBM - Quantum Data Viz</p>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[252.969px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container270() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading43 />
        <Paragraph43 />
      </div>
    </div>
  );
}

function Container271() {
  return (
    <div className="h-[58px] relative shrink-0 w-[300.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[300.969px]">
        <Container269 />
        <Container270 />
      </div>
    </div>
  );
}

function Icon71() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container272() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon71 />
      </div>
    </div>
  );
}

function Container273() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container271 />
          <Container272 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard52() {
  return (
    <div className="[grid-area:42_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container273 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[47.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[47.367px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[44px]">#41</p>
      </div>
    </div>
  );
}

function Container274() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text48 />
      </div>
    </div>
  );
}

function Heading44() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[276.422px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Intel - Holographic Keynote</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[286.422px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container275() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading44 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Container276() {
  return (
    <div className="h-[58px] relative shrink-0 w-[334.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[334.422px]">
        <Container274 />
        <Container275 />
      </div>
    </div>
  );
}

function Icon72() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container277() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon72 />
      </div>
    </div>
  );
}

function Container278() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container276 />
          <Container277 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard53() {
  return (
    <div className="[grid-area:43_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container278 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.984px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#42</p>
      </div>
    </div>
  );
}

function Container279() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text49 />
      </div>
    </div>
  );
}

function Heading45() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[333.734px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Riot Games - Esports Arena Light</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[343.734px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container280() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading45 />
        <Paragraph45 />
      </div>
    </div>
  );
}

function Container281() {
  return (
    <div className="h-[58px] relative shrink-0 w-[391.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[391.734px]">
        <Container279 />
        <Container280 />
      </div>
    </div>
  );
}

function Icon73() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container282() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon73 />
      </div>
    </div>
  );
}

function Container283() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container281 />
          <Container282 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard54() {
  return (
    <div className="[grid-area:44_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container283 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.688px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#43</p>
      </div>
    </div>
  );
}

function Container284() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text50 />
      </div>
    </div>
  );
}

function Heading46() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[267.359px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Adidas - Pink Architecture</p>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[277.359px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container285() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading46 />
        <Paragraph46 />
      </div>
    </div>
  );
}

function Container286() {
  return (
    <div className="h-[58px] relative shrink-0 w-[325.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[325.359px]">
        <Container284 />
        <Container285 />
      </div>
    </div>
  );
}

function Icon74() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container287() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon74 />
      </div>
    </div>
  );
}

function Container288() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container286 />
          <Container287 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard55() {
  return (
    <div className="[grid-area:45_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container288 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[52.133px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[52.133px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[49px]">#44</p>
      </div>
    </div>
  );
}

function Container289() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text51 />
      </div>
    </div>
  );
}

function Heading47() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[179.672px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">LG - OLED Tunnel</p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[189.672px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container290() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading47 />
        <Paragraph47 />
      </div>
    </div>
  );
}

function Container291() {
  return (
    <div className="h-[58px] relative shrink-0 w-[237.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[237.672px]">
        <Container289 />
        <Container290 />
      </div>
    </div>
  );
}

function Icon75() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container292() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon75 />
      </div>
    </div>
  );
}

function Container293() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container291 />
          <Container292 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard56() {
  return (
    <div className="[grid-area:46_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container293 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.336px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#45</p>
      </div>
    </div>
  );
}

function Container294() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text52 />
      </div>
    </div>
  );
}

function Heading48() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[263.07px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Meta - VR Experience Hall</p>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[273.07px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container295() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading48 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Container296() {
  return (
    <div className="h-[58px] relative shrink-0 w-[321.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[321.07px]">
        <Container294 />
        <Container295 />
      </div>
    </div>
  );
}

function Icon76() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container297() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon76 />
      </div>
    </div>
  );
}

function Container298() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container296 />
          <Container297 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard57() {
  return (
    <div className="[grid-area:47_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container298 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.711px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#46</p>
      </div>
    </div>
  );
}

function Container299() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text53 />
      </div>
    </div>
  );
}

function Heading49() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[404.117px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Processing Foundation - Algorithmic Art</p>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[414.117px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container300() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading49 />
        <Paragraph49 />
      </div>
    </div>
  );
}

function Container301() {
  return (
    <div className="h-[58px] relative shrink-0 w-[462.117px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[462.117px]">
        <Container299 />
        <Container300 />
      </div>
    </div>
  );
}

function Icon77() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container302() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon77 />
      </div>
    </div>
  );
}

function Container303() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container301 />
          <Container302 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard58() {
  return (
    <div className="[grid-area:48_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container303 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.141px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#47</p>
      </div>
    </div>
  );
}

function Container304() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text54 />
      </div>
    </div>
  );
}

function Heading50() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[353.984px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Lollapalooza - Outdoor Light Forest</p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[363.984px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container305() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading50 />
        <Paragraph50 />
      </div>
    </div>
  );
}

function Container306() {
  return (
    <div className="h-[58px] relative shrink-0 w-[411.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[411.984px]">
        <Container304 />
        <Container305 />
      </div>
    </div>
  );
}

function Icon78() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container307() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon78 />
      </div>
    </div>
  );
}

function Container308() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container306 />
          <Container307 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard59() {
  return (
    <div className="[grid-area:49_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container308 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.727px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.727px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#48</p>
      </div>
    </div>
  );
}

function Container309() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text55 />
      </div>
    </div>
  );
}

function Heading51() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[421.203px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Daft Punk Legacy - Synthwave Landscape</p>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[431.203px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container310() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading51 />
        <Paragraph51 />
      </div>
    </div>
  );
}

function Container311() {
  return (
    <div className="h-[58px] relative shrink-0 w-[479.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[479.203px]">
        <Container309 />
        <Container310 />
      </div>
    </div>
  );
}

function Icon79() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container312() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon79 />
      </div>
    </div>
  );
}

function Container313() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container311 />
          <Container312 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard60() {
  return (
    <div className="[grid-area:50_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container313 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.711px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#49</p>
      </div>
    </div>
  );
}

function Container314() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text56 />
      </div>
    </div>
  );
}

function Heading52() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[346.43px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Boiler Room - Underground Smoke</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[356.43px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container315() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading52 />
        <Paragraph52 />
      </div>
    </div>
  );
}

function Container316() {
  return (
    <div className="h-[58px] relative shrink-0 w-[404.43px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[404.43px]">
        <Container314 />
        <Container315 />
      </div>
    </div>
  );
}

function Icon80() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container317() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon80 />
      </div>
    </div>
  );
}

function Container318() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container316 />
          <Container317 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard61() {
  return (
    <div className="[grid-area:51_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container318 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.578px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#50</p>
      </div>
    </div>
  );
}

function Container319() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text57 />
      </div>
    </div>
  );
}

function Heading53() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[332.859px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">CD Projekt Red - Night City Event</p>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[342.859px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container320() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading53 />
        <Paragraph53 />
      </div>
    </div>
  );
}

function Container321() {
  return (
    <div className="h-[58px] relative shrink-0 w-[390.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[390.859px]">
        <Container319 />
        <Container320 />
      </div>
    </div>
  );
}

function Icon81() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container322() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon81 />
      </div>
    </div>
  );
}

function Container323() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container321 />
          <Container322 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard62() {
  return (
    <div className="[grid-area:52_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container323 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[46.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[46.813px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[43px]">#51</p>
      </div>
    </div>
  );
}

function Container324() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text58 />
      </div>
    </div>
  );
}

function Heading54() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[241.289px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Coldplay - Stage Colors</p>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[251.289px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container325() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading54 />
        <Paragraph54 />
      </div>
    </div>
  );
}

function Container326() {
  return (
    <div className="h-[58px] relative shrink-0 w-[299.289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[299.289px]">
        <Container324 />
        <Container325 />
      </div>
    </div>
  );
}

function Icon82() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container327() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon82 />
      </div>
    </div>
  );
}

function Container328() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container326 />
          <Container327 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard63() {
  return (
    <div className="[grid-area:53_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container328 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.188px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#52</p>
      </div>
    </div>
  );
}

function Container329() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text59 />
      </div>
    </div>
  );
}

function Heading55() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[428.672px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Bauhaus Archive - Geometric Light Shapes</p>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[438.672px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container330() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading55 />
        <Paragraph55 />
      </div>
    </div>
  );
}

function Container331() {
  return (
    <div className="h-[58px] relative shrink-0 w-[486.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[486.672px]">
        <Container329 />
        <Container330 />
      </div>
    </div>
  );
}

function Icon83() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container332() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon83 />
      </div>
    </div>
  );
}

function Container333() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container331 />
          <Container332 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard64() {
  return (
    <div className="[grid-area:54_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container333 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[50.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[50.891px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[47px]">#53</p>
      </div>
    </div>
  );
}

function Container334() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text60 />
      </div>
    </div>
  );
}

function Heading56() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[269.797px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Hyundai - Interactive Floor</p>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[279.797px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container335() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading56 />
        <Paragraph56 />
      </div>
    </div>
  );
}

function Container336() {
  return (
    <div className="h-[58px] relative shrink-0 w-[327.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[327.797px]">
        <Container334 />
        <Container335 />
      </div>
    </div>
  );
}

function Icon84() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container337() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon84 />
      </div>
    </div>
  );
}

function Container338() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container336 />
          <Container337 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard65() {
  return (
    <div className="[grid-area:55_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container338 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[38.281px] relative shrink-0 w-[51.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[38.281px] relative w-[51.336px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold leading-[34.286px] left-[2px] not-italic text-[#f6339a] text-[24px] top-px underline w-[48px]">#54</p>
      </div>
    </div>
  );
}

function Container339() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.008px] pr-0 py-0 relative size-[32px]">
        <Text61 />
      </div>
    </div>
  );
}

function Heading57() {
  return (
    <div className="absolute h-[32px] left-[5px] overflow-clip top-[2px] w-[347.07px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[28px] left-[5px] text-[20px] text-nowrap text-white top-[1.5px] whitespace-pre">Ars Electronica - Kinetic Sculpture</p>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip top-[40px] w-[357.07px]" data-name="Paragraph">
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[12px] text-neutral-500 text-nowrap top-0 whitespace-pre">Sin categoría</p>
    </div>
  );
}

function Container340() {
  return (
    <div className="basis-0 grow h-[58px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[58px] relative w-full">
        <Heading57 />
        <Paragraph57 />
      </div>
    </div>
  );
}

function Container341() {
  return (
    <div className="h-[58px] relative shrink-0 w-[405.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[58px] items-center overflow-clip relative rounded-[inherit] w-[405.07px]">
        <Container339 />
        <Container340 />
      </div>
    </div>
  );
}

function Icon85() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container342() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon85 />
      </div>
    </div>
  );
}

function Container343() {
  return (
    <div className="bg-neutral-900 h-[90px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container341 />
          <Container342 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard66() {
  return (
    <div className="[grid-area:56_/_1] bg-neutral-900 place-self-stretch relative rounded-[16.4px] shrink-0" data-name="EventEditorCard">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container343 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container344() {
  return (
    <div className="absolute box-border gap-[24px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[104.25px_149px_94px_94px_94px_1245.5px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_94px_minmax(0px,_1fr)] h-[7880.75px] left-[154.5px] pb-[80px] pt-0 px-0 top-[-511.5px] w-[1152px]" data-name="Container">
      <Container3 />
      <Container7 />
      <EventEditorCard />
      <EventEditorCard1 />
      <EventEditorCard2 />
      <EventEditorCard16 />
      <EventEditorCard17 />
      <EventEditorCard18 />
      <EventEditorCard19 />
      <EventEditorCard20 />
      <EventEditorCard21 />
      <EventEditorCard22 />
      <EventEditorCard23 />
      <EventEditorCard24 />
      <EventEditorCard25 />
      <EventEditorCard26 />
      <EventEditorCard27 />
      <EventEditorCard28 />
      <EventEditorCard29 />
      <EventEditorCard30 />
      <EventEditorCard31 />
      <EventEditorCard32 />
      <EventEditorCard33 />
      <EventEditorCard34 />
      <EventEditorCard35 />
      <EventEditorCard36 />
      <EventEditorCard37 />
      <EventEditorCard38 />
      <EventEditorCard39 />
      <EventEditorCard40 />
      <EventEditorCard41 />
      <EventEditorCard42 />
      <EventEditorCard43 />
      <EventEditorCard44 />
      <EventEditorCard45 />
      <EventEditorCard46 />
      <EventEditorCard47 />
      <EventEditorCard48 />
      <EventEditorCard49 />
      <EventEditorCard50 />
      <EventEditorCard51 />
      <EventEditorCard52 />
      <EventEditorCard53 />
      <EventEditorCard54 />
      <EventEditorCard55 />
      <EventEditorCard56 />
      <EventEditorCard57 />
      <EventEditorCard58 />
      <EventEditorCard59 />
      <EventEditorCard60 />
      <EventEditorCard61 />
      <EventEditorCard62 />
      <EventEditorCard63 />
      <EventEditorCard64 />
      <EventEditorCard65 />
      <EventEditorCard66 />
    </div>
  );
}

function Icon86() {
  return (
    <div className="absolute left-0 size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[71.211px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[71.211px]">
        <Icon86 />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[48px] not-italic text-[#a1a1a1] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Volver</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-start relative w-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[30px] text-nowrap text-white whitespace-pre">CMS - Gestión de Contenidos</p>
      </div>
    </div>
  );
}

function Container345() {
  return (
    <div className="h-[36px] relative shrink-0 w-[520.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[36px] items-center relative w-[520.406px]">
        <Button7 />
        <Heading />
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="absolute h-[16px] left-0 top-[10px] w-[81.484px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-[0.5px] whitespace-pre">Sesión Segura</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[16px] left-[97.48px] top-[10px] w-[82.203px]" data-name="Button">
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[44px] not-italic text-[#ff6467] text-[12px] text-center text-nowrap top-[0.5px] translate-x-[-50%] underline whitespace-pre">Cerrar Sesión</p>
    </div>
  );
}

function Icon87() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[9px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute border border-neutral-800 border-solid h-[36px] left-[211.69px] rounded-[6.8px] top-0 w-[150.828px]" data-name="Button">
      <Icon87 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[86.5px] not-italic text-[14px] text-center text-nowrap text-white top-[7.5px] translate-x-[-50%] whitespace-pre">Nuevo Evento</p>
    </div>
  );
}

function Icon88() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3c401780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56b0600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17caa400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#e60076] h-[36px] left-[378.52px] rounded-[6.8px] top-0 w-[175.406px]" data-name="Button">
      <Icon88 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[100px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] translate-x-[-50%] whitespace-pre">Guardar Cambios</p>
    </div>
  );
}

function Container346() {
  return (
    <div className="h-[36px] relative shrink-0 w-[553.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[553.922px]">
        <Text62 />
        <Button8 />
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function Container347() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-0 top-[8px] w-[1152px]" data-name="Container">
      <Container345 />
      <Container346 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6.8px] shrink-0 w-[157.258px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[157.258px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[79px] not-italic text-[14px] text-black text-center text-nowrap top-[8.5px] translate-x-[-50%] whitespace-pre">Contenido General</p>
      </div>
    </div>
  );
}

function Icon89() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2137_3650)" id="Icon">
          <path d={svgPaths.p1d19c880} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 2.66667H12" id="Vector_3" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p22966600} id="Vector_4" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2137_3650">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[36px] relative rounded-[6.8px] shrink-0 w-[268.086px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[268.086px]">
        <Icon89 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[146.5px] not-italic text-[#a1a1a1] text-[14px] text-center text-nowrap top-[8.5px] translate-x-[-50%] whitespace-pre">Optimización Conversacional IA</p>
      </div>
    </div>
  );
}

function Container348() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-start left-0 top-[60px] w-[1152px]" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function Text63() {
  return <div className="absolute left-[1136px] opacity-0 size-0 top-[16px]" data-name="Text" />;
}

function Container349() {
  return (
    <div className="absolute bg-[rgba(10,10,10,0.95)] border-[0px_0px_1px] border-neutral-800 border-solid h-[113px] left-[154.5px] top-[32px] w-[1152px]" data-name="Container">
      <Container347 />
      <Container348 />
      <Text63 />
    </div>
  );
}

function AdminPanel() {
  return (
    <div className="bg-neutral-950 h-[1039px] overflow-clip relative shrink-0 w-full" data-name="AdminPanel">
      <Container344 />
      <Container349 />
    </div>
  );
}

export default function WavBtlWebsite() {
  return (
    <div className="bg-black content-stretch flex flex-col items-start relative size-full" data-name="WAV BTL Website">
      <AdminPanel />
    </div>
  );
}