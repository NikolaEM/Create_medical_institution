 class Osoba {
    public $ime;
    public $prezime;

    public function __construct(string $ime, string $prezime) {
        $this->ime = $ime;
        $this->prezime = $prezime;
    }
}

class Doktor extends Osoba {
    public $specijalnost;

    public function __construct(string $ime, string $prezime, string $specijalnost) {
        parent::__construct($ime, $prezime);
        $this->specijalnost = $specijalnost;
    }

    public function zakaziPregled(Pregled $pregled) {
        echo "Zakazan je pregled $pregled->tip za pacijenta {$pregled->pacijent->ime} {$pregled->pacijent->prezime} kod doktora $this->prezime <br />";
    }
}

class Pacijent extends Osoba {
    public $jmbg;
    public $brojKartona;
    public $doktor;

    public function __construct(string $ime, string $prezime, string $jmbg, string $brojKartona) {
        parent::__construct($ime, $prezime);
        $this->jmbg = $jmbg;
        $this->brojKartona = $brojKartona;
    }

    public function izaberiLekara(Doktor $docMilan) {
        $this->doktor = $docMilan;
    }
}

abstract class Pregled {
    public $datum;
    public $vreme;
    public $pacijent;
    public $tip;

    public function __construct(string $datum, string $vreme, Pacijent $pacijent, string $tip) {
        $this->datum = $datum;
        $this->vreme = $vreme;
        $this->pacijent = $pacijent;
        $this->tip = $tip;
    }

    abstract public function obaviPregled();
}

class PregledNivoSecera extends Pregled {

    public $vrednost;
    public $vremePoslednjegObroka;

    public function __construct(string $datum, string $vreme, Pacijent $pacijent) {
        parent::__construct($datum, $vreme, $pacijent, 'nivo secera');
    }

    public function obaviPregled() {
        echo "Obavi pregled za pacijenta {$this->pacijent->ime} {$this->pacijent->prezime} <br />";
        $this->vrednost = 40;
        $this->vremePoslednjegObroka = '08:56';

        echo "Rezultati preglda: vrednost $this->vrednost, vreme poslednjeg obroka $this->vremePoslednjegObroka <br />";
    }
}

class PregledKrvniPritisak extends Pregled {
    public $gornjaVrednost;
    public $donjaVrednost;
    public $puls;

    public function __construct(string $datum, string $vreme, Pacijent $pacijent) {
        parent::__construct($datum, $vreme, $pacijent, 'krvi pritisak');
    }

    public function obaviPregled() {
        echo "Obavi pregled za pacijenta {$this->pacijent->ime} {$this->pacijent->prezime} <br />";
        $this->gornjaVrednost = 120;
        $this->donjaVrednost = 80;
        $this->puls = 60;
        echo "Rezultati pregleda: pritisak je {$this->gornjaVrednost}/{$this->donjaVrednost}, puls je $this->puls <br />";

    }
}

class PregledHolesterol extends Pregled
{
   public $vrednost;
   public $vremePoslednjegObroka;

   public function __construct(string $datum, string $vreme, Pacijent $pacijent)
   {
       parent::__construct($datum, $vreme, $pacijent, 'nivo holesterola');
   }

   public function obaviPregled()
   {
       echo "Obavi pregled holesterola za pacijenta {$this->pacijent->ime} {$this->pacijent->prezime} <br/>";

       $this->vrednost = 40;
       $this->vremePoslednjegObroka = '08:56';

       echo "Rezultati pregleda: vrednost $this->vrednost, vreme poslednjeg obroka $this->vremePoslednjegObroka <br/>";
   }
}

$docMilan = new Doktor('Milan', 'Milanovic', 'kardiolog');
$pacDragan = new Pacijent('Dragan', 'Jovanovic', '023342323', '0005677');
$pacDragan->izaberiLekara($docMilan);

$pregled1 = new PregledNivoSecera('12-12-2017', '08:00', $pacDragan);
$docMilan->zakaziPregled($pregled1);
$pregled2 = new PregledKrvniPritisak('12-12-2017', '08:15', $pacDragan);
$docMilan->zakaziPregled($pregled2);

$pregled1->obaviPregled();
$pregled2->obaviPregled();