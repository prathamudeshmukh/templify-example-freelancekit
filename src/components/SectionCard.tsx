type Props = {
  title: string
  children: React.ReactNode
}

export default function SectionCard({ title, children }: Props) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white">
      <h3 className="text-xs font-bold tracking-widest uppercase text-brand-600 mb-4">{title}</h3>
      {children}
    </div>
  )
}
