'use client';
import { useState } from 'react';
import { KeyRound, Loader2, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IlustracaoLogin } from '@/components/login/IlustracaoLogin';

const CAMPO =
  'h-11 rounded-md border-[#DCE8E1] bg-white pl-10 text-[13px] text-grafite shadow-none placeholder:text-slate-400 focus-visible:border-verde focus-visible:ring-2 focus-visible:ring-verde/25';

const AVISO_CADASTRO =
  'Para criar seu cadastro, procure a Secretaria Municipal de Desenvolvimento Econômico e Emprego, responsável pelo cadastro de novas empresas/fornecedores.';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Recuperação de senha
  const [recuperarAberto, setRecuperarAberto] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [respostaRecuperacao, setRespostaRecuperacao] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setAviso('Utilize os dados corretos para login.');
    setCarregando(false);
  }

  function enviarRecuperacao(e: React.FormEvent) {
    e.preventDefault();
    setRespostaRecuperacao(
      `Pedido registrado para ${emailRecuperacao}. O envio automático ainda não está ligado — procure a Secretaria responsável pela inspeção municipal.`,
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-fundo px-4 py-6 font-display text-grafite md:px-8">
      <div className="relative grid w-full max-w-[1100px] overflow-hidden rounded-2xl bg-white shadow-[0_2px_6px_rgba(23,36,29,0.05),0_28px_60px_-28px_rgba(23,36,29,0.22)] lg:min-h-[640px] lg:grid-cols-[44%_56%]">
        {/* forma ondulada verde-clara à direita */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 1100 640"
          preserveAspectRatio="none"
        >
          <path d="M800 0 C 735 125 690 240 580 345 C 485 435 410 520 345 640 L1100 640 L1100 0 Z" fill="#E9F4EE" />
        </svg>

        <section className="relative flex flex-col justify-center px-7 py-12 sm:px-14 lg:pl-[110px] lg:pr-6">
          <img src="/inspesim-logo.png" alt="INSPESIM" className="h-[58px] w-auto self-start" />

          <h1 className="mt-10 text-[21px] font-semibold tracking-tight">Acesse sua conta</h1>
          <p className="mt-1 text-[13px] text-slate-500">Serviço de Inspeção Municipal (SIM)</p>

          <form onSubmit={submit} className="mt-7 w-full max-w-[320px]">
            <div className="relative">
              <Label htmlFor="email" className="sr-only">E-mail</Label>
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-verde" />
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={CAMPO}
              />
            </div>

            <div className="relative mt-6">
              <Label htmlFor="senha" className="sr-only">Senha</Label>
              <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-verde" />
              <Input
                id="senha"
                type="password"
                autoComplete="current-password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={CAMPO}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={() => {
                  setAviso('');
                  setRespostaRecuperacao('');
                  setRecuperarAberto(true);
                }}
                className="rounded text-[13px] font-medium text-grafite underline-offset-4 transition-colors hover:text-verde hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde"
              >
                Esqueceu a senha?
              </button>
              <button
                type="button"
                onClick={() => setAviso(AVISO_CADASTRO)}
                className="rounded text-[13px] font-medium text-verde underline-offset-4 transition-colors hover:text-verdeEsc hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde"
              >
                Cadastro
              </button>
            </div>

            {aviso && (
              <p role="status" className="mt-4 text-[12.5px] leading-relaxed text-slate-500">
                {aviso}
              </p>
            )}

            <Button
              type="submit"
              disabled={carregando}
              className="mt-7 h-10 gap-2 rounded-md bg-grafite px-9 text-[13px] font-semibold text-white shadow-[0_8px_16px_-10px_rgba(23,36,29,0.9)] hover:bg-verdeEsc"
            >
              {carregando && <Loader2 className="h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </form>

          <div className="mt-10 w-full max-w-[320px] border-t border-dashed border-border pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Exportação de dados e layout padrão
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-2" title="e-SISBI - SGSI — Sistema de Gestão de Serviço de Inspeção">
                <img src="/e-sisbi-sgsi-icone.png" alt="" className="h-7 w-7 object-contain" />
                <span className="text-[12.5px] font-semibold text-grafite">e-SISBI (SGSI)</span>
              </span>
              <span className="flex items-center gap-2" title="e-SISBI - SGE — Sistema de Gestão de Estabelecimento">
                <img src="/e-sisbi-sge-icone.png" alt="" className="h-7 w-7 object-contain" />
                <span className="text-[12.5px] font-semibold text-grafite">e-SISBI (SGE)</span>
              </span>
            </div>
          </div>
        </section>

        <section aria-hidden className="relative hidden items-center justify-center py-10 pl-4 pr-12 lg:flex">
          <IlustracaoLogin className="w-full max-w-[580px]" />
        </section>
      </div>

      {/* Pop-up de recuperação de senha */}
      <Dialog
        open={recuperarAberto}
        onOpenChange={(aberto) => {
          setRecuperarAberto(aberto);
          if (!aberto) setRespostaRecuperacao('');
        }}
      >
        <DialogContent className="font-display text-grafite sm:max-w-[430px]">
          <DialogHeader>
            <DialogTitle className="text-[17px] font-semibold tracking-tight">Recuperar senha</DialogTitle>
            <DialogDescription className="text-[13px] text-slate-500">
              Informe o e-mail utilizado no seu cadastro.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={enviarRecuperacao}>
            <div className="relative">
              <Label htmlFor="email-recuperacao" className="sr-only">E-mail do cadastro</Label>
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-verde" />
              <Input
                id="email-recuperacao"
                type="email"
                required
                autoComplete="email"
                placeholder="E-mail do cadastro"
                value={emailRecuperacao}
                onChange={(e) => setEmailRecuperacao(e.target.value)}
                className={CAMPO}
              />
            </div>

            {respostaRecuperacao && (
              <p role="status" className="mt-3 text-[12.5px] leading-relaxed text-slate-500">
                {respostaRecuperacao}
              </p>
            )}

            <DialogFooter className="mt-5 gap-2 sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="h-10 rounded-md text-[13px]">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="h-10 rounded-md bg-grafite px-6 text-[13px] font-semibold text-white hover:bg-verdeEsc"
              >
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
