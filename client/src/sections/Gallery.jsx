import { gallery } from '../data/gallery'
import Section from '../components/SectionHeading'
import ProjectGallery from '../components/ProjectGallery'

export default function Gallery() {
  if (!gallery.length) return null
  return (
    <Section id="gallery" title="Gallery" intro="Photographs from study, training and professional life." wide>
      <ProjectGallery images={gallery} />
    </Section>
  )
}
