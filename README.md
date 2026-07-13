# Sinal — com QR dinâmico (editável depois de impresso)

Esta versão adiciona QR codes que você pode editar depois de já ter impresso —
o QR aponta pra um endereço seu (`seusite.netlify.app/r/CODIGO`), que
redireciona pra onde você configurar. Vale pra Link, WhatsApp e Instagram.
Pix continua sempre estático (não é um link, é lido direto pelo app do banco).

**Sem cadastro, sem login, sem senha.** Ao criar um QR dinâmico, você recebe
um **link secreto de edição** — parecido com o "link pra editar sua resposta"
do Google Forms. Quem tiver esse link consegue trocar o destino. Quem não
tiver, não consegue. Não existe conta nem identidade nenhuma por trás.

## Isso muda a forma de publicar

Como agora tem funções rodando no servidor (não é só HTML puro), **não dá mais
pra simplesmente arrastar a pasta no Netlify Drop**. O caminho passa a ser via
GitHub. Ainda assim continua tudo grátis.

## Passo a passo completo

### 1. Subir pro GitHub
1. Crie um repositório novo no GitHub (pode ser privado).
2. Suba todos os arquivos desta pasta (`index.html`, `favicon.svg`,
   `netlify.toml`, `package.json`, e a pasta `netlify/functions/`).

### 2. Conectar no Netlify
1. Entre em [app.netlify.com](https://app.netlify.com) e clique em
   **Add new site > Import an existing project**.
2. Escolha **GitHub** e selecione o repositório.
3. Nas configurações de build, deixe como está — o `netlify.toml` já diz pro
   Netlify onde estão as funções e as rotas. Não precisa de build command,
   nem de variável de ambiente nenhuma.
4. Clique em **Deploy**.

### 3. Testar
1. Abra o link do seu site (`algumacoisa.netlify.app`).
2. Escolha um tipo (Link, WhatsApp ou Instagram), marque
   **"Tornar este QR editável"** e gere — não precisa preencher nada a mais.
3. Vai aparecer um botão **"Copiar link secreto de edição"** — copia e
   guarda esse link em lugar seguro (notas, bookmark, onde for). É a única
   forma de editar esse QR depois.
4. Escaneie o QR: deve te redirecionar pro destino certo.
5. Abra o link secreto que você guardou — ele já chega na seção
   **"Editar um QR dinâmico"** com tudo preenchido. Só falta digitar o novo
   destino e clicar em **Atualizar destino**.
6. Escaneie o mesmo QR de novo (já impresso, sem mexer nele) — agora deve ir
   pro novo destino.

## Sobre segurança

O link secreto de edição é longo e aleatório (não dá pra adivinhar). Só o
hash dele fica guardado no banco — nem olhando direto no Netlify Blobs dá
pra recuperar o link original. **Se a pessoa perder o link, não tem como
recuperar** — só gerar um QR novo. Vale avisar quem for usar pra guardar
esse link em lugar seguro assim que gerar.
