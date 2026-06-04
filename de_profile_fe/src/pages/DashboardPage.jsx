import { useEffect, useMemo, useState } from 'react';
import {
  BriefcaseBusiness,
  Download,
  GripVertical,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import { getCv, saveCv } from '../services/cvApi';

const emptyCv = {
  profile: {
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  sections: [],
};

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function moveItem(list, fromIndex, toIndex) {
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

function getSectionHint(type) {
  const labels = {
    skills: 'Skill set',
    projects: 'Project entries',
    education: 'Education entries',
    experience: 'Work entries',
  };

  return labels[type] || 'Custom entries';
}

function ProfileField({ label, name, value, onChange, multiline = false }) {
  const inputId = `profile-${name}`;

  return (
    <label className={multiline ? 'field field-wide' : 'field'} htmlFor={inputId}>
      <span>{label}</span>
      {multiline ? (
        <textarea id={inputId} value={value} rows={4} onChange={(event) => onChange(name, event.target.value)} />
      ) : (
        <input id={inputId} value={value} onChange={(event) => onChange(name, event.target.value)} />
      )}
    </label>
  );
}

function SectionItemEditor({ item, sectionType, onChange, onRemove, onDragStart, onDragOver, onDrop }) {
  const isSkill = sectionType === 'skills';

  return (
    <article
      className="editor-item"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="drag-handle" aria-label="Keo de doi thu tu item">
        <GripVertical size={18} aria-hidden="true" />
      </div>

      <div className="item-fields">
        <label className="field" htmlFor={`${item.id}-title`}>
          <span>{isSkill ? 'Ky nang' : 'Tieu de'}</span>
          <input
            id={`${item.id}-title`}
            value={item.title}
            onChange={(event) => onChange('title', event.target.value)}
          />
        </label>

        {isSkill ? (
          <label className="field" htmlFor={`${item.id}-level`}>
            <span>Level</span>
            <input
              id={`${item.id}-level`}
              value={item.level}
              onChange={(event) => onChange('level', event.target.value)}
            />
          </label>
        ) : (
          <>
            <label className="field" htmlFor={`${item.id}-subtitle`}>
              <span>Phu de</span>
              <input
                id={`${item.id}-subtitle`}
                value={item.subtitle}
                onChange={(event) => onChange('subtitle', event.target.value)}
              />
            </label>
            <label className="field" htmlFor={`${item.id}-meta`}>
              <span>Thoi gian / Stack</span>
              <input id={`${item.id}-meta`} value={item.meta} onChange={(event) => onChange('meta', event.target.value)} />
            </label>
            <label className="field field-wide" htmlFor={`${item.id}-description`}>
              <span>Mo ta</span>
              <textarea
                id={`${item.id}-description`}
                rows={3}
                value={item.description}
                onChange={(event) => onChange('description', event.target.value)}
              />
            </label>
          </>
        )}
      </div>

      <button className="icon-button danger-button" type="button" onClick={onRemove} aria-label="Xoa item">
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </article>
  );
}

function CvPreview({ cv }) {
  return (
    <article className="cv-preview" aria-label="Ban xem truoc CV">
      <header className="cv-preview-header">
        <div>
          <h2>{cv.profile.name || 'Ten cua ban'}</h2>
          <p>{cv.profile.role || 'Vi tri ung tuyen'}</p>
        </div>
        <div className="cv-contact">
          {cv.profile.email && (
            <span>
              <Mail size={14} aria-hidden="true" />
              {cv.profile.email}
            </span>
          )}
          {cv.profile.phone && (
            <span>
              <Phone size={14} aria-hidden="true" />
              {cv.profile.phone}
            </span>
          )}
          {cv.profile.location && (
            <span>
              <MapPin size={14} aria-hidden="true" />
              {cv.profile.location}
            </span>
          )}
        </div>
      </header>

      {cv.profile.summary && <p className="cv-summary">{cv.profile.summary}</p>}

      <div className="cv-section-stack">
        {cv.sections.map((section) => (
          <section className="cv-section" key={section.id}>
            <h3>{section.title}</h3>
            {section.type === 'skills' ? (
              <div className="cv-skills">
                {section.items.map((item) => (
                  <span key={item.id}>
                    {item.title}
                    {item.level ? <small>{item.level}</small> : null}
                  </span>
                ))}
              </div>
            ) : (
              <div className="cv-entry-stack">
                {section.items.map((item) => (
                  <article className="cv-entry" key={item.id}>
                    <div>
                      <h4>{item.title || 'Tieu de'}</h4>
                      {item.subtitle && <p>{item.subtitle}</p>}
                    </div>
                    {item.meta && <time>{item.meta}</time>}
                    {item.description && <span>{item.description}</span>}
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

export function DashboardPage() {
  const [cv, setCv] = useState(emptyCv);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [sectionDragIndex, setSectionDragIndex] = useState(null);
  const [itemDrag, setItemDrag] = useState(null);

  const sectionCount = useMemo(() => cv.sections.reduce((total, section) => total + section.items.length, 0), [cv]);

  useEffect(() => {
    let isMounted = true;

    getCv()
      .then((data) => {
        if (isMounted) {
          setCv(data);
          setMessage('Da tai CV tu backend');
        }
      })
      .catch((error) => {
        if (isMounted) {
          setMessage(`Khong tai duoc API: ${error.message}`);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function updateProfile(name, value) {
    setCv((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [name]: value,
      },
    }));
  }

  function updateSection(sectionIndex, changes) {
    setCv((current) => ({
      ...current,
      sections: current.sections.map((section, index) =>
        index === sectionIndex ? { ...section, ...changes } : section,
      ),
    }));
  }

  function updateItem(sectionIndex, itemIndex, key, value) {
    setCv((current) => ({
      ...current,
      sections: current.sections.map((section, index) => {
        if (index !== sectionIndex) {
          return section;
        }

        return {
          ...section,
          items: section.items.map((item, innerIndex) =>
            innerIndex === itemIndex ? { ...item, [key]: value } : item,
          ),
        };
      }),
    }));
  }

  function addItem(sectionIndex) {
    setCv((current) => ({
      ...current,
      sections: current.sections.map((section, index) => {
        if (index !== sectionIndex) {
          return section;
        }

        const isSkill = section.type === 'skills';

        return {
          ...section,
          items: [
            ...section.items,
            {
              id: createId(section.type),
              title: isSkill ? 'Ky nang moi' : 'Noi dung moi',
              subtitle: '',
              meta: '',
              level: isSkill ? 'Intermediate' : '',
              description: '',
            },
          ],
        };
      }),
    }));
  }

  function removeItem(sectionIndex, itemIndex) {
    setCv((current) => ({
      ...current,
      sections: current.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: section.items.filter((_, innerIndex) => innerIndex !== itemIndex) }
          : section,
      ),
    }));
  }

  function handleSectionDrop(targetIndex) {
    if (sectionDragIndex === null || sectionDragIndex === targetIndex) {
      setSectionDragIndex(null);
      return;
    }

    setCv((current) => ({
      ...current,
      sections: moveItem(current.sections, sectionDragIndex, targetIndex),
    }));
    setSectionDragIndex(null);
  }

  function handleItemDrop(sectionIndex, targetIndex) {
    if (!itemDrag || itemDrag.sectionIndex !== sectionIndex || itemDrag.itemIndex === targetIndex) {
      setItemDrag(null);
      return;
    }

    setCv((current) => ({
      ...current,
      sections: current.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: moveItem(section.items, itemDrag.itemIndex, targetIndex) }
          : section,
      ),
    }));
    setItemDrag(null);
  }

  async function handleSave() {
    setIsSaving(true);
    setMessage('');

    try {
      const saved = await saveCv(cv);
      setCv(saved);
      setMessage('Da luu CV vao backend');
    } catch (error) {
      setMessage(`Luu that bai: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReload() {
    setIsLoading(true);

    try {
      const data = await getCv();
      setCv(data);
      setMessage('Da khoi phuc du lieu tu backend');
    } catch (error) {
      setMessage(`Tai lai that bai: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="cv-builder-page">
      <section className="builder-hero">
        <div>
          <p className="eyebrow">CV Studio</p>
          <h1>Workspace chỉnh sửa CV cá nhân</h1>
          <p>Nguyễn Ngọc Đính Portfolio Builder</p>
        </div>
        <div className="hero-status">
          <span>{cv.sections.length} section</span>
          <span>{sectionCount} muc noi dung</span>
          <span>{message || 'San sang chinh sua'}</span>
        </div>
      </section>

      <section className="builder-toolbar" aria-label="Thao tac CV">
        <button className="button button-primary" type="button" onClick={handleSave} disabled={isSaving || isLoading}>
          {isSaving ? <Loader2 className="spin" size={18} aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
          Luu CV
        </button>
        <button className="button button-secondary" type="button" onClick={handleReload} disabled={isLoading}>
          <RotateCcw size={18} aria-hidden="true" />
          Tai lai
        </button>
        <button className="button button-secondary" type="button" onClick={() => window.print()}>
          <Download size={18} aria-hidden="true" />
          In / PDF
        </button>
        {isLoading && <span className="toolbar-note">Dang tai du lieu...</span>}
        {!isLoading && message && <span className="toolbar-note">{message}</span>}
      </section>

      <section className="builder-grid">
        <div className="editor-panel" id="editor">
          <section className="editor-card">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Profile</p>
                <h2>Thong tin ca nhan</h2>
              </div>
              <BriefcaseBusiness size={22} aria-hidden="true" />
            </div>

            <div className="profile-form">
              <ProfileField label="Ho ten" name="name" value={cv.profile.name} onChange={updateProfile} />
              <ProfileField label="Vi tri" name="role" value={cv.profile.role} onChange={updateProfile} />
              <ProfileField label="Email" name="email" value={cv.profile.email} onChange={updateProfile} />
              <ProfileField label="So dien thoai" name="phone" value={cv.profile.phone} onChange={updateProfile} />
              <ProfileField label="Dia diem" name="location" value={cv.profile.location} onChange={updateProfile} />
              <ProfileField label="Website" name="website" value={cv.profile.website} onChange={updateProfile} />
              <ProfileField
                label="Tom tat"
                name="summary"
                value={cv.profile.summary}
                onChange={updateProfile}
                multiline
              />
            </div>
          </section>

          <section className="section-editor-stack" aria-label="Sap xep va chinh sua section CV">
            {cv.sections.map((section, sectionIndex) => (
              <article
                className="editor-card section-editor"
                key={section.id}
                draggable
                onDragStart={() => setSectionDragIndex(sectionIndex)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleSectionDrop(sectionIndex)}
              >
                <div className="panel-heading">
                  <div className="section-title-row">
                    <div className="drag-handle" aria-label="Keo de doi thu tu section">
                      <GripVertical size={19} aria-hidden="true" />
                    </div>
                    <label className="field title-field" htmlFor={`${section.id}-title`}>
                      <span>Ten section</span>
                      <input
                        id={`${section.id}-title`}
                        value={section.title}
                        onChange={(event) => updateSection(sectionIndex, { title: event.target.value })}
                      />
                    </label>
                  </div>
                  <button className="button button-secondary" type="button" onClick={() => addItem(sectionIndex)}>
                    <Plus size={17} aria-hidden="true" />
                    Them muc
                  </button>
                </div>

                <p className="section-hint">{getSectionHint(section.type)}</p>

                <div className="item-editor-stack">
                  {section.items.map((item, itemIndex) => (
                    <SectionItemEditor
                      key={item.id}
                      item={item}
                      sectionType={section.type}
                      onChange={(key, value) => updateItem(sectionIndex, itemIndex, key, value)}
                      onRemove={() => removeItem(sectionIndex, itemIndex)}
                      onDragStart={() => setItemDrag({ sectionIndex, itemIndex })}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => handleItemDrop(sectionIndex, itemIndex)}
                    />
                  ))}
                </div>
              </article>
            ))}
          </section>
        </div>

        <aside className="preview-panel" id="preview">
          <div className="preview-shell">
            <div className="preview-topline">
              <span>Live preview</span>
              <small>A4 resume</small>
            </div>
            <CvPreview cv={cv} />
          </div>
        </aside>
      </section>
    </main>
  );
}
