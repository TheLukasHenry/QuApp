import { Feature } from '../../generated-api/models/Feature'
import FeatureComponent from './Feature'

type FeatureListProps = {
  features: Feature[]
}

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <div>
      {features.map((feature) => {
        return (
          <div key={feature.featureID}>
            <FeatureComponent feature={feature} />
          </div>
        )
      })}
    </div>
  )
}
