function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[63.71px] not-italic text-[24px] text-center text-nowrap text-white top-[-1px] tracking-[1.2px] translate-x-[-50%] whitespace-pre">WAV CMS</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[64px] not-italic text-[14px] text-center text-neutral-500 text-nowrap top-[0.5px] translate-x-[-50%] whitespace-pre">Acceso Restringido</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[60px] relative shrink-0 w-[127.914px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[60px] items-start relative w-[127.914px]">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="basis-0 bg-neutral-900 grow h-[40px] min-h-px min-w-px relative rounded-[6.8px] shrink-0" data-name="Password Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center px-[12px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap whitespace-pre">Wav2025**</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-800 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6.8px] shrink-0 w-[72.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center justify-center px-[16px] py-[8px] relative w-[72.672px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-black text-center text-nowrap whitespace-pre">Entrar</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[40px] items-start relative w-[320px]">
        <PasswordInput />
        <Button />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[87.805px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[87.805px]">
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[44px] not-italic text-[14px] text-center text-neutral-500 text-nowrap top-[0.5px] translate-x-[-50%] underline whitespace-pre">Volver al sitio</p>
      </div>
    </div>
  );
}

export default function WavWebsiteHomepageDesignCopyCopy() {
  return (
    <div className="bg-black content-stretch flex flex-col gap-[24px] items-center justify-center relative size-full" data-name="WAV Website Homepage Design (Copy) (Copy)">
      <Container />
      <Container1 />
      <Button1 />
    </div>
  );
}