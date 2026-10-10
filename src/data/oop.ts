import { SiOpenjdk } from 'react-icons/si'
import { TbCpu, TbDeviceDesktopCog, TbNetwork } from 'react-icons/tb'

export type OopConcept = {
  id: string
  title: string
  summary: string
  java: string
  php: string
  // Saída do programa, idêntica nas duas linguagens
  output: string[]
  differences: string[]
}

export const teaching = {
  institution: 'Faculdade de São Lourenço',
  period: '1º semestre de 2026',
  classes: [
    { name: 'Turma de Java', language: 'Java' },
    { name: 'Turma de PHP', language: 'PHP' },
  ],
}

// Primeira experiência como professor (fev/2024 – abr/2025)
export const firstTeaching = {
  period: 'fev/2024 – abr/2025',
  intro:
    'Ser professor universitário me deu a oportunidade de compartilhar o que aprendi na prática e contribuir para a formação de futuros profissionais de computação.',
  quote:
    'Considero essa experiência extremamente gratificante e desafiadora, pois me permite estar em constante atualização com as novas tecnologias e metodologias de ensino.',
  subjects: [
    { id: 'arquitetura', name: 'Fundamentos e Arquitetura de Computadores', icon: TbCpu },
    { id: 'so', name: 'Sistemas Operacionais', icon: TbDeviceDesktopCog },
    { id: 'redes', name: 'Redes de Computadores', icon: TbNetwork },
    { id: 'java', name: 'Java', icon: SiOpenjdk },
  ],
  activities: [
    'Planejamento e condução de aulas teóricas e práticas',
    'Avaliação de trabalhos e provas',
    'Orientação de alunos em projetos e trabalhos do curso',
    'Participação em reuniões de departamento e colegiado',
    'Atualização constante do conhecimento técnico e pedagógico',
  ],
  skills: [
    'Domínio dos conteúdos das disciplinas',
    'Planejamento e organização de aulas',
    'Comunicação e didática',
    'Avaliação e feedback',
    'Trabalho em equipe com outros professores',
    'Pesquisa e atualização profissional',
  ],
}

export const oopConcepts: OopConcept[] = [
  {
    id: 'classe-objeto',
    title: 'Classe e objeto',
    summary: 'A classe é o molde. O objeto é cada coisa criada a partir dele, com os próprios valores.',
    java: `class Produto {
    String nome;
    double preco;

    Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }

    void exibir() {
        System.out.println(nome + " custa R$ " + preco);
    }
}

public class Main {
    public static void main(String[] args) {
        Produto caneca = new Produto("Caneca", 39.9);
        Produto camiseta = new Produto("Camiseta", 79.9);

        caneca.exibir();
        camiseta.exibir();
    }
}`,
    php: `<?php

class Produto
{
    public string $nome;
    public float $preco;

    public function __construct(string $nome, float $preco)
    {
        $this->nome = $nome;
        $this->preco = $preco;
    }

    public function exibir(): void
    {
        echo "{$this->nome} custa R$ {$this->preco}\\n";
    }
}

$caneca = new Produto('Caneca', 39.9);
$camiseta = new Produto('Camiseta', 79.9);

$caneca->exibir();
$camiseta->exibir();`,
    output: ['Caneca custa R$ 39.9', 'Camiseta custa R$ 79.9'],
    differences: [
      'Em Java, o tipo de cada atributo é obrigatório. Em PHP 8, a tipagem é opcional, mas recomendada.',
      'Java acessa os membros com ponto (caneca.exibir()). PHP usa seta ($caneca->exibir()).',
      'O construtor em Java leva o nome da classe. Em PHP, é o método __construct.',
    ],
  },
  {
    id: 'encapsulamento',
    title: 'Encapsulamento',
    summary: 'Esconder o estado interno e expor só operações seguras. O saldo só muda pelo método depositar.',
    java: `class ContaBancaria {
    private double saldo = 0;

    public void depositar(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor inválido");
        }
        saldo += valor;
    }

    public double getSaldo() {
        return saldo;
    }
}

public class Main {
    public static void main(String[] args) {
        ContaBancaria conta = new ContaBancaria();
        conta.depositar(150.5);

        // conta.saldo = 1000000; → erro: saldo é privado
        System.out.println("Saldo: " + conta.getSaldo());
    }
}`,
    php: `<?php

class ContaBancaria
{
    private float $saldo = 0;

    public function depositar(float $valor): void
    {
        if ($valor <= 0) {
            throw new InvalidArgumentException('Valor inválido');
        }
        $this->saldo += $valor;
    }

    public function getSaldo(): float
    {
        return $this->saldo;
    }
}

$conta = new ContaBancaria();
$conta->depositar(150.5);

// $conta->saldo = 1000000; → erro: saldo é privado
echo 'Saldo: ' . $conta->getSaldo() . "\\n";`,
    output: ['Saldo: 150.5'],
    differences: [
      'As duas linguagens usam private, protected e public com o mesmo sentido.',
      'Acessar o saldo de fora gera erro de compilação em Java e erro em tempo de execução em PHP.',
      'A regra fica dentro do método: ninguém consegue depositar um valor negativo.',
    ],
  },
  {
    id: 'heranca',
    title: 'Herança',
    summary: 'A classe filha reaproveita atributos e comportamentos da mãe e especializa só o que precisa.',
    java: `class Funcionario {
    protected String nome;
    protected double salario;

    Funcionario(String nome, double salario) {
        this.nome = nome;
        this.salario = salario;
    }

    String getNome() {
        return nome;
    }

    double calcularPagamento() {
        return salario;
    }
}

class Gerente extends Funcionario {
    private double bonus;

    Gerente(String nome, double salario, double bonus) {
        super(nome, salario);
        this.bonus = bonus;
    }

    @Override
    double calcularPagamento() {
        return salario + bonus;
    }
}

public class Main {
    public static void main(String[] args) {
        Gerente ana = new Gerente("Ana", 8000.5, 1500);
        System.out.println(ana.getNome() + " recebe " + ana.calcularPagamento());
    }
}`,
    php: `<?php

class Funcionario
{
    protected string $nome;
    protected float $salario;

    public function __construct(string $nome, float $salario)
    {
        $this->nome = $nome;
        $this->salario = $salario;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function calcularPagamento(): float
    {
        return $this->salario;
    }
}

class Gerente extends Funcionario
{
    private float $bonus;

    public function __construct(string $nome, float $salario, float $bonus)
    {
        parent::__construct($nome, $salario);
        $this->bonus = $bonus;
    }

    public function calcularPagamento(): float
    {
        return $this->salario + $this->bonus;
    }
}

$ana = new Gerente('Ana', 8000.5, 1500);
echo $ana->getNome() . ' recebe ' . $ana->calcularPagamento() . "\\n";`,
    output: ['Ana recebe 9500.5'],
    differences: [
      'Java chama o construtor da classe mãe com super(...). PHP usa parent::__construct(...).',
      '@Override em Java faz o compilador conferir a sobrescrita. A partir do PHP 8.3, o atributo #[\\Override] cumpre o mesmo papel.',
      'Em Java, protected também libera acesso dentro do mesmo pacote. Em PHP, só a própria classe e as filhas enxergam.',
    ],
  },
  {
    id: 'polimorfismo',
    title: 'Polimorfismo',
    summary: 'O mesmo método, chamado do mesmo jeito, se comporta de forma diferente conforme o objeto.',
    java: `import java.util.List;

// Funcionario e Gerente são os do exemplo de herança

class Estagiario extends Funcionario {
    Estagiario(String nome, double salario) {
        super(nome, salario);
    }

    @Override
    double calcularPagamento() {
        return salario + 300; // auxílio transporte
    }
}

public class Main {
    public static void main(String[] args) {
        List<Funcionario> equipe = List.of(
            new Funcionario("Bruno", 4000.5),
            new Gerente("Ana", 8000.5, 1500),
            new Estagiario("Caio", 1800.5)
        );

        for (Funcionario f : equipe) {
            System.out.println(f.getNome() + ": " + f.calcularPagamento());
        }
    }
}`,
    php: `<?php

// Funcionario e Gerente são os do exemplo de herança

class Estagiario extends Funcionario
{
    public function calcularPagamento(): float
    {
        return $this->salario + 300; // auxílio transporte
    }
}

$equipe = [
    new Funcionario('Bruno', 4000.5),
    new Gerente('Ana', 8000.5, 1500),
    new Estagiario('Caio', 1800.5),
];

foreach ($equipe as $f) {
    echo $f->getNome() . ': ' . $f->calcularPagamento() . "\\n";
}`,
    output: ['Bruno: 4000.5', 'Ana: 9500.5', 'Caio: 2100.5'],
    differences: [
      'A lista guarda Funcionario, mas cada objeto executa a própria versão de calcularPagamento().',
      'Em Java, Estagiario precisa declarar o construtor e chamar super. Em PHP, o construtor da mãe é herdado automaticamente.',
      'Java usa List<Funcionario>, com tipo genérico. PHP usa um array comum.',
    ],
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    summary: 'Um contrato que várias classes cumprem do seu jeito. Quem usa só precisa conhecer o contrato.',
    java: `interface Pagamento {
    String processar(double valor);
}

class Pix implements Pagamento {
    public String processar(double valor) {
        return "Pix de R$ " + valor + " aprovado na hora";
    }
}

class Cartao implements Pagamento {
    private int parcelas;

    Cartao(int parcelas) {
        this.parcelas = parcelas;
    }

    public String processar(double valor) {
        return "Cartão: " + parcelas + "x de R$ " + (valor / parcelas);
    }
}

public class Main {
    public static void main(String[] args) {
        Pagamento[] formas = { new Pix(), new Cartao(2) };

        for (Pagamento p : formas) {
            System.out.println(p.processar(151.5));
        }
    }
}`,
    php: `<?php

interface Pagamento
{
    public function processar(float $valor): string;
}

class Pix implements Pagamento
{
    public function processar(float $valor): string
    {
        return "Pix de R$ {$valor} aprovado na hora";
    }
}

class Cartao implements Pagamento
{
    private int $parcelas;

    public function __construct(int $parcelas)
    {
        $this->parcelas = $parcelas;
    }

    public function processar(float $valor): string
    {
        $parcela = $valor / $this->parcelas;
        return "Cartão: {$this->parcelas}x de R$ {$parcela}";
    }
}

$formas = [new Pix(), new Cartao(2)];

foreach ($formas as $p) {
    echo $p->processar(151.5) . "\\n";
}`,
    output: ['Pix de R$ 151.5 aprovado na hora', 'Cartão: 2x de R$ 75.75'],
    differences: [
      'A interface define o contrato: quem implementa Pagamento é obrigado a ter processar().',
      'Uma nova forma de pagamento entra sem mudar o código que usa a interface.',
      'Nas duas linguagens, uma classe pode implementar várias interfaces, mas herda de uma classe só.',
    ],
  },
  {
    id: 'abstratas',
    title: 'Classes abstratas',
    summary: 'Um molde incompleto: define a estrutura e parte do comportamento, mas não vira objeto sozinho.',
    java: `abstract class Notificacao {
    protected String destinatario;

    Notificacao(String destinatario) {
        this.destinatario = destinatario;
    }

    abstract String canal();

    void enviar(String mensagem) {
        System.out.println("[" + canal() + "] para " + destinatario + ": " + mensagem);
    }
}

class EmailNotificacao extends Notificacao {
    EmailNotificacao(String destinatario) {
        super(destinatario);
    }

    String canal() {
        return "E-mail";
    }
}

class PushNotificacao extends Notificacao {
    PushNotificacao(String destinatario) {
        super(destinatario);
    }

    String canal() {
        return "Push";
    }
}

public class Main {
    public static void main(String[] args) {
        // new Notificacao("x"); → erro: classe abstrata
        new EmailNotificacao("ana@exemplo.com").enviar("Pedido confirmado");
        new PushNotificacao("Ana").enviar("Seu pedido saiu para entrega");
    }
}`,
    php: `<?php

abstract class Notificacao
{
    protected string $destinatario;

    public function __construct(string $destinatario)
    {
        $this->destinatario = $destinatario;
    }

    abstract protected function canal(): string;

    public function enviar(string $mensagem): void
    {
        echo "[{$this->canal()}] para {$this->destinatario}: {$mensagem}\\n";
    }
}

class EmailNotificacao extends Notificacao
{
    protected function canal(): string
    {
        return 'E-mail';
    }
}

class PushNotificacao extends Notificacao
{
    protected function canal(): string
    {
        return 'Push';
    }
}

// new Notificacao('x'); → erro: classe abstrata
(new EmailNotificacao('ana@exemplo.com'))->enviar('Pedido confirmado');
(new PushNotificacao('Ana'))->enviar('Seu pedido saiu para entrega');`,
    output: ['[E-mail] para ana@exemplo.com: Pedido confirmado', '[Push] para Ana: Seu pedido saiu para entrega'],
    differences: [
      'A classe abstrata reúne o que é comum (enviar) e deixa uma parte para as filhas (canal).',
      'Nenhuma das duas linguagens deixa instanciar uma classe abstrata.',
      'Diferente da interface, a classe abstrata pode ter atributos e métodos já implementados.',
    ],
  },
]
