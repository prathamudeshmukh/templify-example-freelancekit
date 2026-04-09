'use client'

import { useProjectStore } from '@/store/project'
import SectionCard from './SectionCard'

export default function SharedProjectForm() {
  const { shared, setFreelancer, setClient, setProject } = useProjectStore()

  return (
    <div className="space-y-4">
      <SectionCard title="Your Details">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">Full Name</label>
            <input
              className="input-field"
              value={shared.freelancer.name}
              onChange={e => setFreelancer({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Company / Studio</label>
            <input
              className="input-field"
              value={shared.freelancer.company}
              onChange={e => setFreelancer({ company: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={shared.freelancer.email}
              onChange={e => setFreelancer({ email: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Phone</label>
            <input
              className="input-field"
              value={shared.freelancer.phone}
              onChange={e => setFreelancer({ phone: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className="field-label">Address</label>
            <input
              className="input-field"
              value={shared.freelancer.address}
              onChange={e => setFreelancer({ address: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Client Details">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">Client Name</label>
            <input
              className="input-field"
              value={shared.client.name}
              onChange={e => setClient({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Company</label>
            <input
              className="input-field"
              value={shared.client.company}
              onChange={e => setClient({ company: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={shared.client.email}
              onChange={e => setClient({ email: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Address</label>
            <input
              className="input-field"
              value={shared.client.address}
              onChange={e => setClient({ address: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Project">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="field-label">Project Name</label>
            <input
              className="input-field"
              value={shared.project.name}
              onChange={e => setProject({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Start Date</label>
            <input
              type="date"
              className="input-field"
              value={shared.project.startDate}
              onChange={e => setProject({ startDate: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
