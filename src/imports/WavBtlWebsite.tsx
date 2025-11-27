import svgPaths from "./svg-069u2i5mt3";
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
    <div className="absolute bg-gradient-to-r box-border content-stretch flex from-[rgba(22,36,86,0.3)] h-[104.25px] items-start justify-between left-0 pb-px pt-[17px] px-[17px] rounded-[16.4px] to-[rgba(60,3,102,0.3)] top-0 w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(43,127,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Container2 />
      <Button />
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

function Heading2() {
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
        <Heading2 />
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
    <div className="absolute bg-gradient-to-r box-border content-stretch flex from-[rgba(70,8,9,0.4)] gap-[12px] h-[149px] items-start left-0 pb-[2px] pt-[18px] px-[18px] rounded-[16.4px] to-[rgba(68,19,6,0.4)] top-[128.25px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(251,44,54,0.3)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[15.945px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[15.945px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[16px]">#1</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[336.492px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[336.492px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Banco de Chile - Neón Banco Chile</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[336.492px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[336.492px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[267px]">slug: banco-de-chile-neon-banco-chile</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[50px] relative shrink-0 w-[384.492px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[384.492px]">
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
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[301.25px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container12 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.914px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[17.914px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[18px]">#2</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text1 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[237.898px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[237.898px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Entel - Experiencia Entel</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[237.898px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[237.898px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[209px]">slug: entel-experiencia-entel</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading4 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[50px] relative shrink-0 w-[285.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[285.898px]">
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
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container15 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard1() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[411.25px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.328px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[19px]">#3</p>
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

function Heading5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[388.109px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[388.109px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Cencosud - Cumbre Creativa Cencosud</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[388.109px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[388.109px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[281px]">slug: cencosud-cumbre-creativa-cencosud</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading5 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[50px] relative shrink-0 w-[436.109px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[436.109px]">
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
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container20 />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard2() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[521.25px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container22 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.586px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.586px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[19px]">#4</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text3 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[540.852px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[540.852px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Altra Running - Trail Experience San José de Costa Rica</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[540.852px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[540.852px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[425px]">slug: altra-running-trail-experience-san-jose-de-costa-rica</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading6 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[50px] relative shrink-0 w-[588.852px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[588.852px]">
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
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
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
          <path d={svgPaths.p15f70e40} id="Vector" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #FF6467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#ffa2a2] text-[12px] top-[0.5px] w-[219px]">Este evento tiene 1 error de validación</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[209.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[209.953px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#ff6467] text-[10px] top-[0.5px] w-[210px]">Campos no permitidos: imagePath, logoPath</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[rgba(70,8,9,0.3)] box-border content-stretch flex gap-[8px] h-[33px] items-center left-0 pb-px pt-0 px-[16px] top-px w-[1148px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(251,44,54,0.2)] border-solid inset-0 pointer-events-none" />
      <Icon7 />
      <Text4 />
      <Text5 />
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
  return <div className="absolute h-[84.875px] left-[19.59px] top-[16px] w-[311.492px]" data-name="Image (Brand Logo)" />;
}

function FileUpload() {
  return <div className="absolute left-[-281.02px] size-0 top-[-379.69px]" data-name="File Upload" />;
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
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-neutral-500 text-nowrap whitespace-pre">blob:https://969a9bca-30b2-4349-9daa-84dbf7e2d302-v2-figmaiframepreview.figma.site/b3b07159-dfd3-4126-bcb7-c86e0b9e8317</p>
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

function Text6() {
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
      <Text6 />
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
  return <div className="absolute left-[-319.73px] size-0 top-[-616.75px]" data-name="File Upload" />;
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
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-neutral-500 text-nowrap whitespace-pre">blob:https://969a9bca-30b2-4349-9daa-84dbf7e2d302-v2-figmaiframepreview.figma.site/bb62eff4-9e3a-4237-ba46-dff4f5cb931c</p>
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

function Text7() {
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
      <Text7 />
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

function Text8() {
  return (
    <div className="absolute h-[15px] left-[42.29px] top-[59.27px] w-[24.977px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[10px] text-neutral-500 text-nowrap top-[0.5px] whitespace-pre">Subir</p>
    </div>
  );
}

function FileUpload2() {
  return <div className="absolute left-[-301.05px] size-0 top-[-956.43px]" data-name="File Upload" />;
}

function Label5() {
  return (
    <div className="absolute bg-neutral-800 border border-neutral-700 border-solid left-[119.55px] rounded-[6.8px] size-[111.555px] top-[119.55px]" data-name="Label">
      <Icon12 />
      <Text8 />
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
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[753.734px] items-start left-0 top-0 w-[350.664px]" data-name="Container">
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

function Text9() {
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
        <Text9 />
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

function Text10() {
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
        <Text10 />
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

function Text11() {
  return (
    <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-full">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-0 text-[10px] text-neutral-500 top-0 w-[24px]">0/50</p>
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
    <div className="h-[15px] relative shrink-0 w-[44px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[15px] items-center relative w-[44px]">
        <Text11 />
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
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap whitespace-pre">Ej: Activación BTL, Showroom Inmersivo...</p>
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

function Text12() {
  return (
    <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-full">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[15px] left-0 text-[10px] text-neutral-500 top-0 w-[42px]">60/1000</p>
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
    <div className="h-[15px] relative shrink-0 w-[62px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[15px] items-center relative w-[62px]">
        <Text12 />
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

function Container76() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[753.734px] items-start left-[374.66px] top-0 w-[725.336px]" data-name="Container">
      <Container52 />
      <FormField3 />
      <FormField4 />
      <FormField5 />
      <Container70 />
      <FormField6 />
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute h-[753.734px] left-[24px] top-[58px] w-[1100px]" data-name="Container">
      <Container51 />
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] h-[835.734px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-neutral-800 border-solid inset-0 pointer-events-none" />
      <Container28 />
      <Container77 />
    </div>
  );
}

function EventEditorCard10() {
  return (
    <div className="absolute bg-neutral-900 h-[921.734px] left-0 rounded-[16.4px] top-[631.25px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[921.734px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container27 />
        <Container78 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(251,44,54,0.5)] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.125px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[19px]">#5</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text13 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[493.719px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[493.719px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Concha y Toro - Experiencia Sonora Concha y Toro</p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[493.719px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[493.719px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[375px]">slug: concha-y-toro-experiencia-sonora-concha-y-toro</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[50px] relative shrink-0 w-[541.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[541.719px]">
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Icon31() {
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

function Container82() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon31 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container81 />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard11() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[1576.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container83 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.344px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[19px]">#6</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text14 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[276.891px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[276.891px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Redbull - Night Expo Redbull</p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[276.891px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[276.891px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[231px]">slug: redbull-night-expo-redbull</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[50px] relative shrink-0 w-[324.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[324.891px]">
        <Container84 />
        <Container85 />
      </div>
    </div>
  );
}

function Icon32() {
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

function Container87() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon32 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container86 />
          <Container87 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard12() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[1686.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container88 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.43px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[17.43px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[18px]">#7</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text15 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[374.609px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[374.609px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Movistar - Lanzamiento Tech Movistar</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18px] relative shrink-0 w-[374.609px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[374.609px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[289px]">slug: movistar-lanzamiento-tech-movistar</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[50px] relative shrink-0 w-[422.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[422.609px]">
        <Container89 />
        <Container90 />
      </div>
    </div>
  );
}

function Icon33() {
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

function Container92() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon33 />
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container91 />
          <Container92 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard13() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[1796.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container93 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.352px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.352px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[19px]">#8</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text16 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[290.648px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[290.648px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">SQM - Showroom Futuro SQM</p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[290.648px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[290.648px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[209px]">slug: sqm-showroom-futuro-sqm</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[50px] relative shrink-0 w-[338.648px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[338.648px]">
        <Container94 />
        <Container95 />
      </div>
    </div>
  );
}

function Icon34() {
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
        <Icon34 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container96 />
          <Container97 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard14() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[1906.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container98 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.344px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[19px]">#9</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text17 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[314px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[314px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">CCU - Ecosistema Creativo CCU</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[18px] relative shrink-0 w-[314px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[314px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[238px]">slug: ccu-ecosistema-creativo-ccu</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[50px] relative shrink-0 w-[362px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[362px]">
        <Container99 />
        <Container100 />
      </div>
    </div>
  );
}

function Icon35() {
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
        <Icon35 />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container101 />
          <Container102 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard15() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2016.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container103 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.578px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#10</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text18 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[297.07px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[297.07px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">WOM - Noche del Futuro WOM</p>
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[297.07px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[297.07px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[217px]">slug: wom-noche-del-futuro-wom</p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="h-[50px] relative shrink-0 w-[345.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[345.07px]">
        <Container104 />
        <Container105 />
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

function Container107() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon36 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container106 />
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard16() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2126.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container108 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[22.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[22.797px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[23px]">#11</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text19 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[310.398px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[310.398px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Paris - Experiencia Electro Paris</p>
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18px] relative shrink-0 w-[310.398px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[310.398px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[267px]">slug: paris-experiencia-electro-paris</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[50px] relative shrink-0 w-[358.398px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[358.398px]">
        <Container109 />
        <Container110 />
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

function Container112() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon37 />
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container111 />
          <Container112 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard17() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2236.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container113 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[24.766px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[25px]">#12</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text20 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[286.883px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[286.883px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Ripley - Ritual Creativo Ripley</p>
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[286.883px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[286.883px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[253px]">slug: ripley-ritual-creativo-ripley</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[50px] relative shrink-0 w-[334.883px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[334.883px]">
        <Container114 />
        <Container115 />
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

function Container117() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon38 />
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container116 />
          <Container117 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard18() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2346.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container118 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.18px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#13</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text21 />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[423.133px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[423.133px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Multinacional Chile - Summit Digital LATAM</p>
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[18px] relative shrink-0 w-[423.133px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[423.133px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[332px]">slug: multinacional-chile-summit-digital-latam</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[50px] relative shrink-0 w-[471.133px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[471.133px]">
        <Container119 />
        <Container120 />
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

function Container122() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon39 />
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container121 />
          <Container122 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard19() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2456.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container123 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.438px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#14</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text22 />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[192.945px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[192.945px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Didi - Live Expo Didi</p>
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[18px] relative shrink-0 w-[192.945px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[192.945px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[181px]">slug: didi-live-expo-didi</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="h-[50px] relative shrink-0 w-[240.945px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[240.945px]">
        <Container124 />
        <Container125 />
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

function Container127() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container126 />
          <Container127 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard20() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2566.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container128 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[24.969px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[25px]">#15</p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text23 />
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[445.273px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[445.273px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Cornershop - Showcase Creativo Cornershop</p>
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[18px] relative shrink-0 w-[445.273px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[445.273px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[325px]">slug: cornershop-showcase-creativo-cornershop</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading17 />
        <Paragraph18 />
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="h-[50px] relative shrink-0 w-[493.273px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[493.273px]">
        <Container129 />
        <Container130 />
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

function Container132() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container131 />
          <Container132 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard21() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2676.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container133 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.188px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#16</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text24 />
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[541.688px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[541.688px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Antofagasta Minerals - Vibe Expo Antofagasta Minerals</p>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[18px] relative shrink-0 w-[541.688px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[541.688px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[411px]">slug: antofagasta-minerals-vibe-expo-antofagasta-minerals</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="h-[50px] relative shrink-0 w-[589.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[589.688px]">
        <Container134 />
        <Container135 />
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

function Container137() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon42 />
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container136 />
          <Container137 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard22() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2786.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container138 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.273px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[24.273px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[25px]">#17</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text25 />
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[396.836px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[396.836px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Sernatur - Experiencia Creativa Sernatur</p>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[18px] relative shrink-0 w-[396.836px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[396.836px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[317px]">slug: sernatur-experiencia-creativa-sernatur</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading19 />
        <Paragraph20 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[50px] relative shrink-0 w-[444.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[444.836px]">
        <Container139 />
        <Container140 />
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

function Container142() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon43 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container141 />
          <Container142 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard23() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[2896.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container143 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.195px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.195px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#18</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text26 />
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[378.719px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[378.719px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Metrogas - Encuentro Digital Metrogas</p>
      </div>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[18px] relative shrink-0 w-[378.719px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[378.719px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[296px]">slug: metrogas-encuentro-digital-metrogas</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[50px] relative shrink-0 w-[426.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[426.719px]">
        <Container144 />
        <Container145 />
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

function Container147() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon44 />
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container146 />
          <Container147 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard24() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3006.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container148 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.188px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#19</p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text27 />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[499.914px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[499.914px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Clínica Alemana - Expo Innovación Clínica Alemana</p>
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[18px] relative shrink-0 w-[499.914px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[499.914px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[382px]">slug: clinica-alemana-expo-innovacion-clinica-alemana</p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading21 />
        <Paragraph22 />
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="h-[50px] relative shrink-0 w-[547.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[547.914px]">
        <Container149 />
        <Container150 />
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

function Container152() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon45 />
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container151 />
          <Container152 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard25() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3116.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container153 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.547px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#20</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text28 />
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[253.484px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[253.484px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">ISL - Atmósfera Digital ISL</p>
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[18px] relative shrink-0 w-[253.484px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[253.484px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[224px]">slug: isl-atmosfera-digital-isl</p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading22 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="h-[50px] relative shrink-0 w-[301.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[301.484px]">
        <Container154 />
        <Container155 />
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

function Container157() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon46 />
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container156 />
          <Container157 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard26() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3226.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container158 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[24.766px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[25px]">#21</p>
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text29 />
      </div>
    </div>
  );
}

function Heading23() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[288.547px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[288.547px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">ACHS - Evento Cultural ACHS</p>
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[18px] relative shrink-0 w-[288.547px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[288.547px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[224px]">slug: achs-evento-cultural-achs</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading23 />
        <Paragraph24 />
      </div>
    </div>
  );
}

function Container161() {
  return (
    <div className="h-[50px] relative shrink-0 w-[336.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[336.547px]">
        <Container159 />
        <Container160 />
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

function Container162() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon47 />
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container161 />
          <Container162 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard27() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3336.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container163 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.734px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[27px]">#22</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text30 />
      </div>
    </div>
  );
}

function Heading24() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[432.727px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[432.727px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">FinTech Chile - Expo de Futuro FinTech Chile</p>
      </div>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[18px] relative shrink-0 w-[432.727px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[432.727px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[346px]">slug: fintech-chile-expo-de-futuro-fintech-chile</p>
      </div>
    </div>
  );
}

function Container165() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading24 />
        <Paragraph25 />
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[50px] relative shrink-0 w-[480.727px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[480.727px]">
        <Container164 />
        <Container165 />
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

function Container167() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon48 />
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container166 />
          <Container167 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard28() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3446.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container168 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.148px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.148px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#23</p>
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text31 />
      </div>
    </div>
  );
}

function Heading25() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[418.773px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[418.773px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Metro de Santiago - BTL Metro de Santiago</p>
      </div>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[18px] relative shrink-0 w-[418.773px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[418.773px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[325px]">slug: metro-de-santiago-btl-metro-de-santiago</p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading25 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="h-[50px] relative shrink-0 w-[466.773px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[466.773px]">
        <Container169 />
        <Container170 />
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

function Container172() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon49 />
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container171 />
          <Container172 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard29() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3556.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container173 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.188px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#24</p>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text32 />
      </div>
    </div>
  );
}

function Heading26() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[338.242px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[338.242px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Carozzi - Cumbre Creativa Carozzi</p>
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[18px] relative shrink-0 w-[338.242px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[338.242px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[267px]">slug: carozzi-cumbre-creativa-carozzi</p>
      </div>
    </div>
  );
}

function Container175() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading26 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="h-[50px] relative shrink-0 w-[386.242px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[386.242px]">
        <Container174 />
        <Container175 />
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

function Container177() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon50 />
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container176 />
          <Container177 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard30() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3666.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container178 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.938px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[27px]">#25</p>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text33 />
      </div>
    </div>
  );
}

function Heading27() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[351.484px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[351.484px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Sodimac - Noche de Marca Sodimac</p>
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[18px] relative shrink-0 w-[351.484px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[351.484px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[260px]">slug: sodimac-noche-de-marca-sodimac</p>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading27 />
        <Paragraph28 />
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="h-[50px] relative shrink-0 w-[399.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[399.484px]">
        <Container179 />
        <Container180 />
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

function Container182() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon51 />
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container181 />
          <Container182 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard31() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3776.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container183 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.156px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#26</p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text34 />
      </div>
    </div>
  );
}

function Heading28() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[303.086px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[303.086px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Copec - Interfaz Urbana Copec</p>
      </div>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[18px] relative shrink-0 w-[303.086px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[303.086px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[238px]">slug: copec-interfaz-urbana-copec</p>
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading28 />
        <Paragraph29 />
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="h-[50px] relative shrink-0 w-[351.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[351.086px]">
        <Container184 />
        <Container185 />
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

function Container187() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon52 />
      </div>
    </div>
  );
}

function Container188() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container186 />
          <Container187 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard32() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3886.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container188 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.242px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.242px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[27px]">#27</p>
      </div>
    </div>
  );
}

function Container189() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text35 />
      </div>
    </div>
  );
}

function Heading29() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[290.133px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[290.133px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Enel - Experiencia Digital Enel</p>
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[18px] relative shrink-0 w-[290.133px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[290.133px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[253px]">slug: enel-experiencia-digital-enel</p>
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading29 />
        <Paragraph30 />
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="h-[50px] relative shrink-0 w-[338.133px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[338.133px]">
        <Container189 />
        <Container190 />
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

function Container192() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon53 />
      </div>
    </div>
  );
}

function Container193() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container191 />
          <Container192 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard33() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[3996.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container193 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.164px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.164px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#28</p>
      </div>
    </div>
  );
}

function Container194() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text36 />
      </div>
    </div>
  );
}

function Heading30() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[472.523px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[472.523px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">LATAM Airlines - Noche Creativa LATAM Airlines</p>
      </div>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[18px] relative shrink-0 w-[472.523px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[472.523px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[361px]">slug: latam-airlines-noche-creativa-latam-airlines</p>
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading30 />
        <Paragraph31 />
      </div>
    </div>
  );
}

function Container196() {
  return (
    <div className="h-[50px] relative shrink-0 w-[520.523px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[520.523px]">
        <Container194 />
        <Container195 />
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

function Container197() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon54 />
      </div>
    </div>
  );
}

function Container198() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container196 />
          <Container197 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard34() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4106.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container198 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.156px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#29</p>
      </div>
    </div>
  );
}

function Container199() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text37 />
      </div>
    </div>
  );
}

function Heading31() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[665.219px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[665.219px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Municipalidad de Santiago - Expo Urbana Municipalidad de Santiago</p>
      </div>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[18px] relative shrink-0 w-[665.219px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[665.219px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[497px]">slug: municipalidad-de-santiago-expo-urbana-municipalidad-de-santiago</p>
      </div>
    </div>
  );
}

function Container200() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading31 />
        <Paragraph32 />
      </div>
    </div>
  );
}

function Container201() {
  return (
    <div className="h-[50px] relative shrink-0 w-[713.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[713.219px]">
        <Container199 />
        <Container200 />
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

function Container202() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon55 />
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container201 />
          <Container202 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard35() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4216.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container203 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.961px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#30</p>
      </div>
    </div>
  );
}

function Container204() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text38 />
      </div>
    </div>
  );
}

function Heading32() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[312.898px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[312.898px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">UDD - Experiencia Creativa UDD</p>
      </div>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[18px] relative shrink-0 w-[312.898px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[312.898px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[245px]">slug: udd-experiencia-creativa-udd</p>
      </div>
    </div>
  );
}

function Container205() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading32 />
        <Paragraph33 />
      </div>
    </div>
  );
}

function Container206() {
  return (
    <div className="h-[50px] relative shrink-0 w-[360.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[360.898px]">
        <Container204 />
        <Container205 />
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

function Container207() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon56 />
      </div>
    </div>
  );
}

function Container208() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container206 />
          <Container207 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard36() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4326.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container208 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.18px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#31</p>
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text39 />
      </div>
    </div>
  );
}

function Heading33() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[323.602px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[323.602px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Sony Music - Neon Beats Festival</p>
      </div>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[18px] relative shrink-0 w-[323.602px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[323.602px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[260px]">slug: sony-music-neon-beats-festival</p>
      </div>
    </div>
  );
}

function Container210() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading33 />
        <Paragraph34 />
      </div>
    </div>
  );
}

function Container211() {
  return (
    <div className="h-[50px] relative shrink-0 w-[371.602px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[371.602px]">
        <Container209 />
        <Container210 />
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

function Container212() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon57 />
      </div>
    </div>
  );
}

function Container213() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container211 />
          <Container212 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard37() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4436.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container213 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.148px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.148px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#32</p>
      </div>
    </div>
  );
}

function Container214() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text40 />
      </div>
    </div>
  );
}

function Heading34() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[252.977px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[252.977px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Spotify - Radar Live Stage</p>
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[18px] relative shrink-0 w-[252.977px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[252.977px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[217px]">slug: spotify-radar-live-stage</p>
      </div>
    </div>
  );
}

function Container215() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading34 />
        <Paragraph35 />
      </div>
    </div>
  );
}

function Container216() {
  return (
    <div className="h-[50px] relative shrink-0 w-[300.977px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[300.977px]">
        <Container214 />
        <Container215 />
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

function Container217() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon58 />
      </div>
    </div>
  );
}

function Container218() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container216 />
          <Container217 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard38() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4546.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container218 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.563px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#33</p>
      </div>
    </div>
  );
}

function Container219() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text41 />
      </div>
    </div>
  );
}

function Heading35() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[256.898px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[256.898px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Vogue - Fashion Night Out</p>
      </div>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[18px] relative shrink-0 w-[256.898px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[256.898px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[209px]">slug: vogue-fashion-night-out</p>
      </div>
    </div>
  );
}

function Container220() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading35 />
        <Paragraph36 />
      </div>
    </div>
  );
}

function Container221() {
  return (
    <div className="h-[50px] relative shrink-0 w-[304.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[304.898px]">
        <Container219 />
        <Container220 />
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

function Container222() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon59 />
      </div>
    </div>
  );
}

function Container223() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container221 />
          <Container222 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard39() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4656.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container223 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.82px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.82px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#34</p>
      </div>
    </div>
  );
}

function Container224() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text42 />
      </div>
    </div>
  );
}

function Heading36() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[340.141px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[340.141px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Samsung - Galaxy Unpacked Show</p>
      </div>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[18px] relative shrink-0 w-[340.141px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[340.141px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[245px]">slug: samsung-galaxy-unpacked-show</p>
      </div>
    </div>
  );
}

function Container225() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading36 />
        <Paragraph37 />
      </div>
    </div>
  );
}

function Container226() {
  return (
    <div className="h-[50px] relative shrink-0 w-[388.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[388.141px]">
        <Container224 />
        <Container225 />
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

function Container227() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon60 />
      </div>
    </div>
  );
}

function Container228() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container226 />
          <Container227 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard40() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4766.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container228 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.352px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.352px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#35</p>
      </div>
    </div>
  );
}

function Container229() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text43 />
      </div>
    </div>
  );
}

function Heading37() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[314.406px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[314.406px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">MoMA - Interactive Light Exhibit</p>
      </div>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[18px] relative shrink-0 w-[314.406px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[314.406px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[260px]">slug: moma-interactive-light-exhibit</p>
      </div>
    </div>
  );
}

function Container230() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading37 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function Container231() {
  return (
    <div className="h-[50px] relative shrink-0 w-[362.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[362.406px]">
        <Container229 />
        <Container230 />
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

function Container232() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon61 />
      </div>
    </div>
  );
}

function Container233() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container231 />
          <Container232 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard41() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4876.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container233 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.57px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#36</p>
      </div>
    </div>
  );
}

function Container234() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text44 />
      </div>
    </div>
  );
}

function Heading38() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[318.336px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[318.336px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">TeamLab - Borderless Projection</p>
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[18px] relative shrink-0 w-[318.336px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[318.336px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[253px]">slug: teamlab-borderless-projection</p>
      </div>
    </div>
  );
}

function Container235() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading38 />
        <Paragraph39 />
      </div>
    </div>
  );
}

function Container236() {
  return (
    <div className="h-[50px] relative shrink-0 w-[366.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[366.336px]">
        <Container234 />
        <Container235 />
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

function Container237() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon62 />
      </div>
    </div>
  );
}

function Container238() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container236 />
          <Container237 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard42() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[4986.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container238 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.656px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[27px]">#37</p>
      </div>
    </div>
  );
}

function Container239() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text45 />
      </div>
    </div>
  );
}

function Heading39() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[213.438px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[213.438px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Nike - Cyberpunk Run</p>
      </div>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[18px] relative shrink-0 w-[213.438px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[213.438px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[173px]">slug: nike-cyberpunk-run</p>
      </div>
    </div>
  );
}

function Container240() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading39 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Container241() {
  return (
    <div className="h-[50px] relative shrink-0 w-[261.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[261.438px]">
        <Container239 />
        <Container240 />
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

function Container242() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon63 />
      </div>
    </div>
  );
}

function Container243() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container241 />
          <Container242 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard43() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5096.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container243 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.578px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#38</p>
      </div>
    </div>
  );
}

function Container244() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text46 />
      </div>
    </div>
  );
}

function Heading40() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[322.234px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[322.234px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Twitch - Streamer Awards Purple</p>
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[18px] relative shrink-0 w-[322.234px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[322.234px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[253px]">slug: twitch-streamer-awards-purple</p>
      </div>
    </div>
  );
}

function Container245() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading40 />
        <Paragraph41 />
      </div>
    </div>
  );
}

function Container246() {
  return (
    <div className="h-[50px] relative shrink-0 w-[370.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[370.234px]">
        <Container244 />
        <Container245 />
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

function Container247() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon64 />
      </div>
    </div>
  );
}

function Container248() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container246 />
          <Container247 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard44() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5206.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container248 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.57px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#39</p>
      </div>
    </div>
  );
}

function Container249() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text47 />
      </div>
    </div>
  );
}

function Heading41() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[323.422px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[323.422px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Tomorrowland - Laser Symphony</p>
      </div>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[18px] relative shrink-0 w-[323.422px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[323.422px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[238px]">slug: tomorrowland-laser-symphony</p>
      </div>
    </div>
  );
}

function Container250() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading41 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container251() {
  return (
    <div className="h-[50px] relative shrink-0 w-[371.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[371.422px]">
        <Container249 />
        <Container250 />
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

function Container252() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon65 />
      </div>
    </div>
  );
}

function Container253() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container251 />
          <Container252 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard45() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5316.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container253 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[20px] relative shrink-0 w-[28.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[28.219px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[29px]">#40</p>
      </div>
    </div>
  );
}

function Container254() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text48 />
      </div>
    </div>
  );
}

function Heading42() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[232.969px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[232.969px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">IBM - Quantum Data Viz</p>
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[18px] relative shrink-0 w-[232.969px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[232.969px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[188px]">slug: ibm-quantum-data-viz</p>
      </div>
    </div>
  );
}

function Container255() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading42 />
        <Paragraph43 />
      </div>
    </div>
  );
}

function Container256() {
  return (
    <div className="h-[50px] relative shrink-0 w-[280.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[280.969px]">
        <Container254 />
        <Container255 />
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

function Container257() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon66 />
      </div>
    </div>
  );
}

function Container258() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container256 />
          <Container257 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard46() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5426.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container258 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.297px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[26px]">#41</p>
      </div>
    </div>
  );
}

function Container259() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text49 />
      </div>
    </div>
  );
}

function Heading43() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[266.422px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[266.422px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Intel - Holographic Keynote</p>
      </div>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[18px] relative shrink-0 w-[266.422px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[266.422px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[224px]">slug: intel-holographic-keynote</p>
      </div>
    </div>
  );
}

function Container260() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading43 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Container261() {
  return (
    <div className="h-[50px] relative shrink-0 w-[314.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[314.422px]">
        <Container259 />
        <Container260 />
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

function Container262() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon67 />
      </div>
    </div>
  );
}

function Container263() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container261 />
          <Container262 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard47() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5536.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container263 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.406px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#42</p>
      </div>
    </div>
  );
}

function Container264() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text50 />
      </div>
    </div>
  );
}

function Heading44() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[323.734px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[323.734px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Riot Games - Esports Arena Light</p>
      </div>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[18px] relative shrink-0 w-[323.734px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[323.734px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[260px]">slug: riot-games-esports-arena-light</p>
      </div>
    </div>
  );
}

function Container265() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading44 />
        <Paragraph45 />
      </div>
    </div>
  );
}

function Container266() {
  return (
    <div className="h-[50px] relative shrink-0 w-[371.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[371.734px]">
        <Container264 />
        <Container265 />
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

function Container267() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon68 />
      </div>
    </div>
  );
}

function Container268() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container266 />
          <Container267 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard48() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5646.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container268 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.82px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.82px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#43</p>
      </div>
    </div>
  );
}

function Container269() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text51 />
      </div>
    </div>
  );
}

function Heading45() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[257.359px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[257.359px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Adidas - Pink Architecture</p>
      </div>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[18px] relative shrink-0 w-[257.359px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[257.359px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[217px]">slug: adidas-pink-architecture</p>
      </div>
    </div>
  );
}

function Container270() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading45 />
        <Paragraph46 />
      </div>
    </div>
  );
}

function Container271() {
  return (
    <div className="h-[50px] relative shrink-0 w-[305.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[305.359px]">
        <Container269 />
        <Container270 />
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

function Container272() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon69 />
      </div>
    </div>
  );
}

function Container273() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container271 />
          <Container272 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard49() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5756.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container273 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[20px] relative shrink-0 w-[28.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[28.078px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[29px]">#44</p>
      </div>
    </div>
  );
}

function Container274() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text52 />
      </div>
    </div>
  );
}

function Heading46() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[169.672px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[169.672px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">LG - OLED Tunnel</p>
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[18px] relative shrink-0 w-[169.672px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[169.672px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[145px]">slug: lg-oled-tunnel</p>
      </div>
    </div>
  );
}

function Container275() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading46 />
        <Paragraph47 />
      </div>
    </div>
  );
}

function Container276() {
  return (
    <div className="h-[50px] relative shrink-0 w-[217.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[217.672px]">
        <Container274 />
        <Container275 />
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

function Container277() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon70 />
      </div>
    </div>
  );
}

function Container278() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container276 />
          <Container277 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard50() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5866.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container278 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.609px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#45</p>
      </div>
    </div>
  );
}

function Container279() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text53 />
      </div>
    </div>
  );
}

function Heading47() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[253.07px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[253.07px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Meta - VR Experience Hall</p>
      </div>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[18px] relative shrink-0 w-[253.07px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[253.07px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[209px]">slug: meta-vr-experience-hall</p>
      </div>
    </div>
  );
}

function Container280() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading47 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Container281() {
  return (
    <div className="h-[50px] relative shrink-0 w-[301.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[301.07px]">
        <Container279 />
        <Container280 />
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

function Container282() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon71 />
      </div>
    </div>
  );
}

function Container283() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container281 />
          <Container282 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard51() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[5976.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container283 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.828px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#46</p>
      </div>
    </div>
  );
}

function Container284() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text54 />
      </div>
    </div>
  );
}

function Heading48() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[394.117px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[394.117px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Processing Foundation - Algorithmic Art</p>
      </div>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[18px] relative shrink-0 w-[394.117px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[394.117px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[310px]">slug: processing-foundation-algorithmic-art</p>
      </div>
    </div>
  );
}

function Container285() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading48 />
        <Paragraph49 />
      </div>
    </div>
  );
}

function Container286() {
  return (
    <div className="h-[50px] relative shrink-0 w-[442.117px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[442.117px]">
        <Container284 />
        <Container285 />
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

function Container287() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon72 />
      </div>
    </div>
  );
}

function Container288() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container286 />
          <Container287 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard52() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6086.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container288 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.914px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.914px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[27px]">#47</p>
      </div>
    </div>
  );
}

function Container289() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text55 />
      </div>
    </div>
  );
}

function Heading49() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[343.984px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[343.984px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Lollapalooza - Outdoor Light Forest</p>
      </div>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[18px] relative shrink-0 w-[343.984px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[343.984px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[281px]">slug: lollapalooza-outdoor-light-forest</p>
      </div>
    </div>
  );
}

function Container290() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading49 />
        <Paragraph50 />
      </div>
    </div>
  );
}

function Container291() {
  return (
    <div className="h-[50px] relative shrink-0 w-[391.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[391.984px]">
        <Container289 />
        <Container290 />
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

function Container292() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon73 />
      </div>
    </div>
  );
}

function Container293() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container291 />
          <Container292 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard53() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6196.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container293 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.836px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#48</p>
      </div>
    </div>
  );
}

function Container294() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text56 />
      </div>
    </div>
  );
}

function Heading50() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[411.203px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[411.203px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Daft Punk Legacy - Synthwave Landscape</p>
      </div>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[18px] relative shrink-0 w-[411.203px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[411.203px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[303px]">slug: daft-punk-legacy-synthwave-landscape</p>
      </div>
    </div>
  );
}

function Container295() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading50 />
        <Paragraph51 />
      </div>
    </div>
  );
}

function Container296() {
  return (
    <div className="h-[50px] relative shrink-0 w-[459.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[459.203px]">
        <Container294 />
        <Container295 />
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

function Container297() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon74 />
      </div>
    </div>
  );
}

function Container298() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container296 />
          <Container297 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard54() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6306.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container298 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.828px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#49</p>
      </div>
    </div>
  );
}

function Container299() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text57 />
      </div>
    </div>
  );
}

function Heading51() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[336.43px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[336.43px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Boiler Room - Underground Smoke</p>
      </div>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[18px] relative shrink-0 w-[336.43px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[336.43px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[253px]">slug: boiler-room-underground-smoke</p>
      </div>
    </div>
  );
}

function Container300() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading51 />
        <Paragraph52 />
      </div>
    </div>
  );
}

function Container301() {
  return (
    <div className="h-[50px] relative shrink-0 w-[384.43px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[384.43px]">
        <Container299 />
        <Container300 />
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

function Container302() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon75 />
      </div>
    </div>
  );
}

function Container303() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container301 />
          <Container302 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard55() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6416.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container303 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.758px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.758px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#50</p>
      </div>
    </div>
  );
}

function Container304() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text58 />
      </div>
    </div>
  );
}

function Heading52() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[322.859px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[322.859px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">CD Projekt Red - Night City Event</p>
      </div>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[18px] relative shrink-0 w-[322.859px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[322.859px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[267px]">slug: cd-projekt-red-night-city-event</p>
      </div>
    </div>
  );
}

function Container305() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading52 />
        <Paragraph53 />
      </div>
    </div>
  );
}

function Container306() {
  return (
    <div className="h-[50px] relative shrink-0 w-[370.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[370.859px]">
        <Container304 />
        <Container305 />
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

function Container307() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon76 />
      </div>
    </div>
  );
}

function Container308() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container306 />
          <Container307 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard56() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6526.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container308 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[24.969px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[25px]">#51</p>
      </div>
    </div>
  );
}

function Container309() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text59 />
      </div>
    </div>
  );
}

function Heading53() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[231.289px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[231.289px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Coldplay - Stage Colors</p>
      </div>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="h-[18px] relative shrink-0 w-[231.289px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[231.289px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[195px]">slug: coldplay-stage-colors</p>
      </div>
    </div>
  );
}

function Container310() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading53 />
        <Paragraph54 />
      </div>
    </div>
  );
}

function Container311() {
  return (
    <div className="h-[50px] relative shrink-0 w-[279.289px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[279.289px]">
        <Container309 />
        <Container310 />
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

function Container312() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon77 />
      </div>
    </div>
  );
}

function Container313() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container311 />
          <Container312 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard57() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6636.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container313 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.938px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[27px]">#52</p>
      </div>
    </div>
  );
}

function Container314() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text60 />
      </div>
    </div>
  );
}

function Heading54() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[418.672px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[418.672px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Bauhaus Archive - Geometric Light Shapes</p>
      </div>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[18px] relative shrink-0 w-[418.672px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[418.672px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[317px]">slug: bauhaus-archive-geometric-light-shapes</p>
      </div>
    </div>
  );
}

function Container315() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading54 />
        <Paragraph55 />
      </div>
    </div>
  );
}

function Container316() {
  return (
    <div className="h-[50px] relative shrink-0 w-[466.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[466.672px]">
        <Container314 />
        <Container315 />
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

function Container317() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon78 />
      </div>
    </div>
  );
}

function Container318() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container316 />
          <Container317 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard58() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6746.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container318 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.352px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.352px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#53</p>
      </div>
    </div>
  );
}

function Container319() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[32px]">
        <Text61 />
      </div>
    </div>
  );
}

function Heading55() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[259.797px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[259.797px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Hyundai - Interactive Floor</p>
      </div>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="h-[18px] relative shrink-0 w-[259.797px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[259.797px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[224px]">slug: hyundai-interactive-floor</p>
      </div>
    </div>
  );
}

function Container320() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading55 />
        <Paragraph56 />
      </div>
    </div>
  );
}

function Container321() {
  return (
    <div className="h-[50px] relative shrink-0 w-[307.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[307.797px]">
        <Container319 />
        <Container320 />
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

function Container322() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon79 />
      </div>
    </div>
  );
}

function Container323() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container321 />
          <Container322 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard59() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6856.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container323 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.609px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#f6339a] text-[14px] top-[0.5px] w-[28px]">#54</p>
      </div>
    </div>
  );
}

function Container324() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text62 />
      </div>
    </div>
  );
}

function Heading56() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[337.07px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[337.07px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.5px] whitespace-pre">Ars Electronica - Kinetic Sculpture</p>
      </div>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[18px] relative shrink-0 w-[337.07px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] overflow-clip relative rounded-[inherit] w-[337.07px]">
        <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-neutral-500 top-0 w-[281px]">slug: ars-electronica-kinetic-sculpture</p>
      </div>
    </div>
  );
}

function Container325() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[50px] items-start relative w-full">
        <Heading56 />
        <Paragraph57 />
      </div>
    </div>
  );
}

function Container326() {
  return (
    <div className="h-[50px] relative shrink-0 w-[385.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[50px] items-center overflow-clip relative rounded-[inherit] w-[385.07px]">
        <Container324 />
        <Container325 />
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

function Container327() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative size-[20px]">
        <Icon80 />
      </div>
    </div>
  );
}

function Container328() {
  return (
    <div className="bg-neutral-900 h-[82px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[82px] items-center justify-between px-[16px] py-0 relative w-full">
          <Container326 />
          <Container327 />
        </div>
      </div>
    </div>
  );
}

function EventEditorCard60() {
  return (
    <div className="absolute bg-neutral-900 h-[86px] left-0 rounded-[16.4px] top-[6966.98px] w-[1152px]" data-name="EventEditorCard">
      <div className="box-border content-stretch flex flex-col h-[86px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[1152px]">
        <Container328 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-neutral-800 border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container329() {
  return (
    <div className="absolute h-[7132.98px] left-[154.5px] top-[-460px] w-[1152px]" data-name="Container">
      <Container3 />
      <Container7 />
      <EventEditorCard />
      <EventEditorCard1 />
      <EventEditorCard2 />
      <EventEditorCard10 />
      <EventEditorCard11 />
      <EventEditorCard12 />
      <EventEditorCard13 />
      <EventEditorCard14 />
      <EventEditorCard15 />
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
    </div>
  );
}

function Icon81() {
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
        <Icon81 />
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

function Container330() {
  return (
    <div className="h-[36px] relative shrink-0 w-[520.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[36px] items-center relative w-[520.406px]">
        <Button7 />
        <Heading />
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="absolute h-[16px] left-0 top-[10px] w-[81.484px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-[0.5px] whitespace-pre">Sesión Segura</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[16px] left-[97.48px] top-[10px] w-[77.203px]" data-name="Button">
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[39px] not-italic text-[#ff6467] text-[12px] text-center text-nowrap top-[0.5px] translate-x-[-50%] underline whitespace-pre">Cerrar Sesión</p>
    </div>
  );
}

function Icon82() {
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
    <div className="absolute border border-neutral-800 border-solid h-[36px] left-[206.69px] rounded-[6.8px] top-0 w-[150.828px]" data-name="Button">
      <Icon82 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[86.5px] not-italic text-[14px] text-center text-nowrap text-white top-[7.5px] translate-x-[-50%] whitespace-pre">Nuevo Evento</p>
    </div>
  );
}

function Icon83() {
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
    <div className="absolute bg-[#e60076] h-[36px] left-[373.52px] rounded-[6.8px] top-0 w-[175.406px]" data-name="Button">
      <Icon83 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[100px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] translate-x-[-50%] whitespace-pre">Guardar Cambios</p>
    </div>
  );
}

function Container331() {
  return (
    <div className="h-[36px] relative shrink-0 w-[548.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[548.922px]">
        <Text63 />
        <Button8 />
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function Container332() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-0 top-[8px] w-[1152px]" data-name="Container">
      <Container330 />
      <Container331 />
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

function Icon84() {
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
        <Icon84 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[146.5px] not-italic text-[#a1a1a1] text-[14px] text-center text-nowrap top-[8.5px] translate-x-[-50%] whitespace-pre">Optimización Conversacional IA</p>
      </div>
    </div>
  );
}

function Container333() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-start left-0 top-[60px] w-[1152px]" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function Text64() {
  return <div className="absolute left-[1136px] opacity-0 size-0 top-[16px]" data-name="Text" />;
}

function Container334() {
  return (
    <div className="absolute bg-[rgba(10,10,10,0.95)] border-[0px_0px_1px] border-neutral-800 border-solid h-[113px] left-[154.5px] top-[32px] w-[1152px]" data-name="Container">
      <Container332 />
      <Container333 />
      <Text64 />
    </div>
  );
}

function AdminPanel() {
  return (
    <div className="bg-neutral-950 h-[1039px] overflow-clip relative shrink-0 w-full" data-name="AdminPanel">
      <Container329 />
      <Container334 />
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