import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'

// import FeatureList from './FeaturesList'

const featuresClient = new FeaturesApi()

async function getFeatures() {
  const response = await featuresClient.featuresGet({
    ...{ cache: 'no-store' },
  })
  return response
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [modalOpen, setModalOpen] = useState(false)
  const features = await getFeatures()

  return (
    <div lang="en">
      <div className="pt-16">
        Cient side rendered features
        {features.map((feature) => {
          return (
            <div key={feature.id}>
              <div>{feature.name}</div>
              <button
                className="p-4 bg-blue-500 text-white rounded"
                // onClick={() => setModalOpen(true)}
              >
                Open Modal
              </button>
            </div>
          )
        })}
        {children}
      </div>
    </div>
  )
}
