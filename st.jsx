import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function StreifenblattForm() {
  const [form, setForm] = useState({
    datum: "",
    dienstzeit: "",
    fuStw: "",
    beamte: "",
    ort: "",
    uhrzeit: "",
    beschreibung: "",
    massnahmen: [],
    weitereSchritte: "",
  });

  const massnahmenOptionen = [
    "Personen-/Fahrzeugkontrolle",
    "Ruhestörung",
    "Verkehrsunfall",
    "Ladendiebstahl",
    "Sachbeschädigung",
    "Hausfriedensbruch",
    "Drogendelikte",
    "Verdächtige Person",
    "Verkehrskontrolle",
    "Widerstand gegen Vollstreckungsbeamte",
    "Diebstahl",
    "Körperverletzung",
    "Vandalismus",
    "Platzverweis",
    "Gefährliche Körperverletzung",
    "Unfallflucht",
    "Illegale Versammlung"
  ];

  const handleSubmit = async () => {
    const payload = {
      content: `**📋 Streifenbericht eingereicht**\n\n` +
        `**Datum:** ${form.datum}\n` +
        `**Dienstzeit:** ${form.dienstzeit}\n` +
        `**Funkstreifenwagen:** ${form.fuStw}\n` +
        `**Beamte:** ${form.beamte}\n` +
        `**Ort:** ${form.ort} um ${form.uhrzeit} Uhr\n` +
        `**Vorkommnisse:** ${form.massnahmen.join(", ")}\n` +
        `**Beschreibung:** ${form.beschreibung}\n` +
        `**Weitere Schritte:** ${form.weitereSchritte}`
    };

    await fetch("https://discord.com/api/webhooks/1380961960748650536/N1HrBy_bBZXTWy5IdZ8kmAIlKwdHiaeDOfe3vL9NO6fGfmY3NpRXdHd8Nf0Vn4aKCTzT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    alert("Bericht erfolgreich eingereicht!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">Polizei Niedersachsen – Streifenblatt</h1>
      <div className="grid gap-4">
        <Input placeholder="Datum" onChange={e => setForm({ ...form, datum: e.target.value })} />
        <Input placeholder="Dienstzeit (z. B. 06:00–14:00)" onChange={e => setForm({ ...form, dienstzeit: e.target.value })} />
        <Input placeholder="Funkstreifenwagen (z. B. FuStw 12-1)" onChange={e => setForm({ ...form, fuStw: e.target.value })} />
        <Input placeholder="Beamte im Dienst (z. B. PHM Meier / PK Schulz)" onChange={e => setForm({ ...form, beamte: e.target.value })} />
        <Input placeholder="Einsatzort" onChange={e => setForm({ ...form, ort: e.target.value })} />
        <Input placeholder="Uhrzeit vor Ort (z. B. 08:15)" onChange={e => setForm({ ...form, uhrzeit: e.target.value })} />

        <Label className="font-semibold">Vorkommnisse</Label>
        <div className="grid grid-cols-2 gap-2">
          {massnahmenOptionen.map(opt => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={opt}
                onChange={e => {
                  const checked = e.target.checked;
                  setForm({
                    ...form,
                    massnahmen: checked
                      ? [...form.massnahmen, opt]
                      : form.massnahmen.filter(o => o !== opt),
                  });
                }}
              />
              {opt}
            </label>
          ))}
        </div>

        <Textarea placeholder="Beschreibung des Einsatzes" rows={5} onChange={e => setForm({ ...form, beschreibung: e.target.value })} />
        <Textarea placeholder="Weitere Schritte oder Hinweise" rows={3} onChange={e => setForm({ ...form, weitereSchritte: e.target.value })} />

        <Button onClick={handleSubmit} className="bg-blue-900 text-white w-full hover:bg-blue-800">
          Bericht erstellen und einreichen
        </Button>
      </div>
    </div>
  );
}
