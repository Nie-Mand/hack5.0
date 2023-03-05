import { Button, Container } from '~/ui'

export default function Index() {
  return (
    <div>
      <div className="h-[80vh]">
        <Container className="grid grid-cols-2 lg:grid-cols-3 gap-10 h-full">
          <div className="grid content-center col-span-2">
            <div className="grid gap-y-6">
              <h1 className="font-bold text-4xl lg:text-5xl text-secondary-700">
              Control your Business
              </h1>
              <h2 className="text-xl font-bold text-primary-800">
              Always have your most important financial data at your fingertips and optimize your business management
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="primary">Documentation</Button>
                <Button variant="tertiary" href="/register">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div className="row-start-1 lg:row-start-auto col-span-2 lg:col-span-1 grid justify-items-center lg:justify-items-end content-center">
            <img src="/art/hero.jpg" />
          </div>
        </Container>
      </div>
    </div>
  )
}
