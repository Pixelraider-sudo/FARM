import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Droplets, Mountain, Plus, Sprout, Tractor } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/Misc";
import { RowActions } from "@/components/ui/CrudBits";
import { useCollection } from "@/hooks/useCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { Farm } from "@/types";

const BLANK = { name: "", county: "", village: "", lat: "", lng: "", size: "", altitude: "", soil: "Loam", ph: "", water: "Rainfall only", irrigation: "None (rain-fed)", crops: "", notes: "" };
type Draft = typeof BLANK;

export default function Farms() {
  useDocumentTitle("My farms");
  const farms = useCollection<Farm>(STORAGE_KEYS.FARMS, "farm");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [d, setD] = useState<Draft>(BLANK);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});

  const set = (k: keyof Draft) => (e: { target: { value: string } }) => setD((p) => ({ ...p, [k]: e.target.value }));
  const openNew = () => { setEditId(null); setD(BLANK); setErrors({}); setOpen(true); };
  const openEdit = (f: Farm) => { setEditId(f.id); const { name, county, village, lat, lng, size, altitude, soil, ph, water, irrigation, crops, notes } = f; setD({ name, county, village, lat, lng, size, altitude, soil, ph, water, irrigation, crops, notes }); setErrors({}); setOpen(true); };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!d.name.trim()) er.name = "Give your farm a name.";
    if (!d.county.trim()) er.county = "County is required.";
    if (d.size && !(parseFloat(d.size) > 0)) er.size = "Enter a size above 0.";
    setErrors(er);
    if (Object.keys(er).length) return;
    editId ? farms.update(editId, d) : farms.add(d);
    setOpen(false);
  };

  return (
    <>
      <PageHeader eyebrow="My farms" scene="field" title={<>Every plot, <em className="accent-italic !text-lime">on record.</em></>} lead="Keep location, soil, water and crops for each farm in one place.">
        <Button variant="lime" onClick={openNew}><Plus size={18} /> Add farm</Button>
      </PageHeader>
      <section className="wrap mt-10">
        {farms.items.length === 0 ? (
          <EmptyState icon={Tractor} title="No farms yet" body="Add your first farm to personalise the dashboard and keep soil and water details handy." action={<Button onClick={openNew}><Plus size={18} /> Add your first farm</Button>} />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {farms.items.map((f) => (
              <article key={f.id} className="card flex flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <div><h3 className="text-3xl">{f.name}</h3><p className="text-sm text-muted">{[f.village, f.county].filter(Boolean).join(", ")}</p></div>
                  <RowActions label={f.name} onEdit={() => openEdit(f)} onDelete={() => farms.remove(f.id)} />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                  <span className="rounded-2xl bg-surface2 p-3"><span className="label block text-muted">Size</span><strong>{f.size || "—"} acres</strong></span>
                  <span className="rounded-2xl bg-surface2 p-3"><span className="label flex items-center gap-1 text-muted"><Mountain size={11} />Altitude</span><strong>{f.altitude ? `${f.altitude} m` : "—"}</strong></span>
                  <span className="rounded-2xl bg-surface2 p-3"><span className="label block text-muted">Soil</span><strong>{f.soil}{f.ph ? ` · pH ${f.ph}` : ""}</strong></span>
                  <span className="rounded-2xl bg-surface2 p-3"><span className="label flex items-center gap-1 text-muted"><Droplets size={11} />Water</span><strong>{f.water}</strong></span>
                </div>
                {f.crops && <p className="mt-4 flex items-start gap-2 text-sm"><Sprout size={16} className="mt-0.5 shrink-0 text-brand" />{f.crops}</p>}
                {f.notes && <p className="mt-2 text-sm text-muted">{f.notes}</p>}
                {f.lat && f.lng && <a className="mt-auto pt-4 text-sm font-bold text-brand hover:underline" target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/?mlat=${f.lat}&mlon=${f.lng}#map=14/${f.lat}/${f.lng}`}>View on map ↗</a>}
              </article>
            ))}
          </div>
        )}
        <p className="mt-8 text-sm text-muted">Need a plan for a plot? <Link to="/planner" className="font-bold text-brand hover:underline">Open the season planner →</Link></p>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit farm" : "Add farm"}>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
          <TextField wrapperClassName="sm:col-span-2" id="f-name" label="Farm name" value={d.name} onChange={set("name")} error={errors.name} />
          <TextField id="f-county" label="County" value={d.county} onChange={set("county")} error={errors.county} />
          <TextField id="f-village" label="Village" value={d.village} onChange={set("village")} />
          <TextField id="f-lat" label="GPS latitude" placeholder="-1.2921" value={d.lat} onChange={set("lat")} />
          <TextField id="f-lng" label="GPS longitude" placeholder="36.8219" value={d.lng} onChange={set("lng")} />
          <TextField id="f-size" label="Size (acres)" type="number" step="0.1" value={d.size} onChange={set("size")} error={errors.size} />
          <TextField id="f-alt" label="Altitude (m)" type="number" value={d.altitude} onChange={set("altitude")} />
          <SelectField id="f-soil" label="Soil type" value={d.soil} onChange={set("soil")} options={["Loam", "Clay", "Sandy", "Sandy Loam", "Clay Loam", "Volcanic"]} />
          <TextField id="f-ph" label="Soil pH" placeholder="6.2" value={d.ph} onChange={set("ph")} />
          <SelectField id="f-water" label="Water source" value={d.water} onChange={set("water")} options={["Rainfall only", "Borehole", "River", "Dam / Pond", "Piped water"]} />
          <SelectField id="f-irr" label="Irrigation" value={d.irrigation} onChange={set("irrigation")} options={["None (rain-fed)", "Drip", "Furrow", "Sprinkler", "Manual"]} />
          <TextField wrapperClassName="sm:col-span-2" id="f-crops" label="Crops grown" placeholder="Maize, Beans" value={d.crops} onChange={set("crops")} />
          <TextArea wrapperClassName="sm:col-span-2" id="f-notes" label="Notes" rows={3} value={d.notes} onChange={set("notes")} />
          <div className="flex justify-end gap-3 sm:col-span-2"><Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">{editId ? "Save changes" : "Add farm"}</Button></div>
        </form>
      </Modal>
    </>
  );
}
