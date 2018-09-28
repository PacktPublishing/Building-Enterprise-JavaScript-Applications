
<!-- TOC -->

- [1. - Building Robust Infrastructure with Terraform & Kubernetes](#1---building-robust-infrastructure-with-terraform--kubernetes)
  - [1.1. Requirements for a Robust System](#11-requirements-for-a-robust-system)
    - [1.1.1. High Availability](#111-high-availability)
      - [1.1.1.1. Eliminating Single Points of Failure (SPOF)](#1111-eliminating-single-points-of-failure-spof)
        - [1.1.1.1.1. Load Balancers](#11111-load-balancers)
        - [1.1.1.1.2. Floating IP Address](#11112-floating-ip-address)
    - [1.1.2. High Reliability](#112-high-reliability)
      - [1.1.2.1. Testing for Reliability](#1121-testing-for-reliability)
    - [1.1.3. High Throughput](#113-high-throughput)
    - [1.1.4. High Scalability](#114-high-scalability)
  - [1.2. Clusters and Microservices](#12-clusters-and-microservices)
    - [1.2.1. Microservices](#121-microservices)
    - [1.2.2. Clusters](#122-clusters)
  - [1.3. Cluster Management](#13-cluster-management)
    - [1.3.1. Cluster-Level Tools](#131-cluster-level-tools)
      - [1.3.1.1. Discovery Service](#1311-discovery-service)
      - [1.3.1.2. Scheduler](#1312-scheduler)
      - [1.3.1.3. Global Configuration Store](#1313-global-configuration-store)
        - [1.3.1.3.1. Discovery Service & Global Configuration Store, Together](#13131-discovery-service--global-configuration-store-together)
      - [1.3.1.4. Provisioning Tools](#1314-provisioning-tools)
    - [1.3.2. Node-Level Tools](#132-node-level-tools)
      - [1.3.2.1. Local Configuration Management Tool](#1321-local-configuration-management-tool)
      - [1.3.2.2. Container Runtime](#1322-container-runtime)
      - [1.3.2.3. ??](#1323-)
    - [1.3.3. Cluster Management Tools](#133-cluster-management-tools)
  - [1.4. Getting Started with Kubernetes](#14-getting-started-with-kubernetes)
      - [1.4.0.1. Cleaning Our Environment](#1401-cleaning-our-environment)
    - [1.4.1. Setting Up Local Development Environment](#141-setting-up-local-development-environment)
      - [1.4.1.1. Installing Minikube](#1411-installing-minikube)
      - [1.4.1.2. Turning Off Swap](#1412-turning-off-swap)
      - [1.4.1.3. Installing a Hypervisor or Docker Machine](#1413-installing-a-hypervisor-or-docker-machine)
      - [1.4.1.4. Installing `kubectl`](#1414-installing-kubectl)
    - [1.4.2. Starting Our Cluster](#142-starting-our-cluster)
      - [1.4.2.1. Setting Environment Variables for Local Cluster](#1421-setting-environment-variables-for-local-cluster)
      - [1.4.2.2. Running `minikube start`](#1422-running-minikube-start)
      - [1.4.2.3. A Note on Staleness](#1423-a-note-on-staleness)
    - [1.4.3. Creating Our First Pod](#143-creating-our-first-pod)
      - [1.4.3.1. Run Pods with `kubelet`](#1431-run-pods-with-kubelet)
      - [1.4.3.2. Running Elasticsearch inside a Pod with `kubectl run`](#1432-running-elasticsearch-inside-a-pod-with-kubectl-run)
      - [1.4.3.3. Understanding Kubernetes Objects](#1433-understanding-kubernetes-objects)
        - [1.4.3.3.1. Deployment](#14331-deployment)
        - [1.4.3.3.2. ReplicaSet](#14332-replicaset)
        - [1.4.3.3.3. DaemonSet](#14333-daemonset)
        - [1.4.3.3.4. Pod](#14334-pod)
    - [1.4.4. Declarative over Imperative](#144-declarative-over-imperative)
      - [1.4.4.1. Controllers](#1441-controllers)
      - [1.4.4.2. Deleting Deployment](#1442-deleting-deployment)
      - [1.4.4.3. Running a Pod Declaratively with `kubectl apply`](#1443-running-a-pod-declaratively-with-kubectl-apply)
    - [1.4.5. Visualizing Deployment using Web UI Dashboard](#145-visualizing-deployment-using-web-ui-dashboard)
    - [1.4.6. Exposing Services](#146-exposing-services)
    - [1.4.7. Networking](#147-networking)
      - [1.4.7.1. Overlay Network](#1471-overlay-network)
      - [1.4.7.2. Pods](#1472-pods)
    - [1.4.8. Deploying Our API Service](#148-deploying-our-api-service)
    - [1.4.9. Controllers](#149-controllers)
      - [1.4.9.1. Cloud Provider Controller](#1491-cloud-provider-controller)
    - [1.4.10. Distributed Lock Manager](#1410-distributed-lock-manager)
    - [1.4.11. Summary](#1411-summary)
  - [1.5. Cleaning things up](#15-cleaning-things-up)
  - [1.6. Statelessness](#16-statelessness)
  - [1.7. Overview](#17-overview)
  - [1.8. Node Components](#18-node-components)
    - [1.8.1. Container Runtime](#181-container-runtime)
    - [1.8.2. `kube-proxy`](#182-kube-proxy)
  - [1.9. Kubernetes](#19-kubernetes)
    - [1.9.1. Kubernetes Objects](#191-kubernetes-objects)
      - [1.9.1.1. Pod](#1911-pod)
      - [1.9.1.2. Replica](#1912-replica)
  - [1.10. Service Discovery](#110-service-discovery)
    - [1.10.1. Security](#1101-security)
  - [1.11. Benefits of Docker](#111-benefits-of-docker)
    - [1.11.1. Reduced Server Cost](#1111-reduced-server-cost)
    - [1.11.2. Images are Layered](#1112-images-are-layered)
    - [1.11.3. Supports Service-Orientated Architecture (SOA)](#1113-supports-service-orientated-architecture-soa)
  - [1.12. Orchestration](#112-orchestration)
      - [1.12.0.1. Elasticsearch](#11201-elasticsearch)
  - [1.13. Deployment Strategies](#113-deployment-strategies)
    - [1.13.1. Regional Deployments](#1131-regional-deployments)
    - [1.13.2. Blue/Green deployment](#1132-bluegreen-deployment)
    - [1.13.3. No Deploy Fridays](#1133-no-deploy-fridays)
  - [1.14. Cluster configuration](#114-cluster-configuration)
  - [1.15. How many replica](#115-how-many-replica)
    - [1.15.1. Tradeoffs](#1151-tradeoffs)
    - [1.15.2. Region Evacuation](#1152-region-evacuation)
    - [1.15.3. Auto-Scaling](#1153-auto-scaling)
        - [1.15.3.0.1. `kubeadm`](#115301-kubeadm)
        - [1.15.3.0.2. `kubelet`](#115302-kubelet)

<!-- /TOC -->

# 1. - Building Robust Infrastructure with Terraform & Kubernetes

In the previous chapter, we used Docker to pre-build and package different parts of our application into images, which are portable and can be deployed onto any environment. Although this is an improvement, and automated parts of our workflow, we are still **manually** deploying our containers on a **single** server.

This approach is not suitable for production applications, primarily because there's no redundancy. Our server is **solely** responsible for running our entire application; if it crashes, the application will be down. Furthermore, a significant part of our process is still done manually, so there's a lot of room for more automation.

Instead of having a single instance of each application component (e.g. database, API server etc), hosted on a single machine, we can spawn multiple instances of each component and distribute them across multiple machines. We can do it in a way so that if one host becomes unavailable, there are enough available components on the other machines to keep the application, as a whole, responsive and functional.

What we've described just now is a cluster. Clusters allow us to have high availability, reliability and scalability. But coordinating and managing this distributed, redundant cluster is non-trivial, and requires many moving parts to work together. These includes:

* Service Discovery Tools
* Global Configuration Store
* Networking Tools
* Scheduling Tools
* ??

Systems exists which encompases all of these tools; these are usually called _Cluster Management Tools_. But because almost all Cluster Management Tools also uses containers to deploy, most can also be called _Container Orchestration Systems_. A prime example is _Kubernetes_, open-sourced by Google in 2014.

In this chapter, we will start by providing you with a general overview of how components of a Cluster Management Tool work together. Then, we will walk you through how to use Kubernetes to deploy and manage our application as a distributed cluster.

## 1.1. Requirements for a Robust System

Apart from standard requirements that applies to all applications, such as security, there are additional conditions which must be met for enterprise applications:

* High Availability
* High Reliability
* High Throughput
* High Scalability

### 1.1.1. High Availability

Availability is a measure of the proportion of time a system is able to fulfil its intended function. For us, it means the percentage of time that our API can respond successfully to a client's requests.

Availability is measured as the percentage of time the system is functional, over the total elapsed time. This is typically represented as "nines". For example, a system with an availability level of "four nines" will have 99.99%+ uptime.

Generally speaking, the more complex a system, the more moving parts there are, and the more chances things can go wrong; this translates to a lower availability.
  
Most online platforms offer a Service Level Agreement (SLA) that includes a clause for the minimum availability of the platform. Here are some examples (accurate at the time of writing):

* Google Compute Engine Service Level Agreement (SLA) - 99.99%
* Amazon Compute Service Level Agreement - 99.99%
* App Engine Service Level Agreement (SLA) - 99.95%
* Google Maps—Service Level Agreement (“Maps API SLA”) - 99.9%
* Amazon S3 Service Level Agreement - 99.9%

As you can see, the industry standard ranges from "three nines" (99.9%) to "four nines" (99.99%). However, this still averages a downtime of anything from 8.77 hours to 52.6 minutes per year, respectively.

Google Cloud reports an actual availability of 99.978% on their Help page, which amounts to around 1.93 hours per year. For a complex system, this is a respectable figure.

#### 1.1.1.1. Eliminating Single Points of Failure (SPOF)

To ensure high-availability for any system (not just IT), we must eliminate _Single Points of Failure_ (SPOF). A SPOF is a component within a system which, if failed, causes the entire system to fail.

Currently, since we are deploying only one instance of our backend API, that single Node process running our API is the SPOF. If that fails, then our whole application is down.

Therefore, the first step in eliminating a SPOF is to deploy multiple instances of that component behind a _load balancer_.

##### 1.1.1.1.1. Load Balancers

When a client sends a request to our API, instead of routing that request to a specific instance's IP address, the request will be routed to the load balancer's public IP.

![](https://cdn.keycdn.com/support/wp-content/uploads/2015/12/load-balancing.png)

The load balancer will monitor the health of each instance, and redirects the request to an available instance. If one of the instances becomes unavailable, the load balancer can simply redirect traffic elsewhere until the instance is back up.

Apart from this, the load balancer also fulfils its primary purpose of distributing the workload evenly between the different instances.

However, the load balancer now becomes the SPOF.

##### 1.1.1.1.2. Floating IP Address

To mitigate this issue, we should have multiple load balancers.

However, each load balancer would have a different IP address, and we cannot reasonably ask a client to try each IP until their request succeeds. Instead, we can use a _floating IP address_.

![](https://cloud.google.com/solutions/images/floating-ip-migration-use-case.svg)

Here's how it works:

* You have a cluster of load balancers
* One member of the cluster will be _active_ at any given time; the others are _standby_ members.
* When a request is sent to the floating IP address, it will be routed to the active member.
* If the currently active load balancer fails, then another load balancer is promoted to the active member.

![](https://assets.digitalocean.com/articles/high-availability/Diagram_1.png)

This is managed using the _Address Resolution Protocol_ (ARP). Each load balancer node keeps a record of an _ARP table_, which maps link layer addresses, such as the MAC addresses of each node, to network layer addresses, such as IPv4 addresses.

Each load balancer will have its own copy of the ARP table, and will negotiate amongst themselves as to which load balancer will be active. If a new member is to be promoted, that member would broadcast a _gratuitous ARP message_ to the rest of the members to associate its own MAC address with the floating IP, and the other members would update their ARP table with this information.

![](https://assets.digitalocean.com/articles/high_availability/ha-diagram-animated.gif)

### 1.1.2. High Reliability

Reliability is a measure of the confidence in a system, and is inversely proportional to the probability of failure.

Reliability is measured using several metrics:

* _Mean time between failures_ (MTBF) - uptime / number of failures
* _Mean time to repair_ (MTTR) - average time it takes the team to fix a failure and return the system online

#### 1.1.2.1. Testing for Reliability

The easiest way to increase reliability is to increase test coverage of the system. This is, of course, assuming that those tests are meaningful tests.

Tests increases reliability by:

* Increasing MTBF - the more thorough your tests, the more likely you'll catch bugs before the system is deployed
* Reducing MTTR - because historical test results inform you of the last version which passes all tests. If the application is experiencing a high level of failures, then the team can quickly rollback to the last-known-good version

### 1.1.3. High Throughput

Throughput is a measure of the number of requests that can be fulfilled in a given time interval.

The throughput of a system depends on several factors:

* Network Latency - the amount of time it takes for the message to get from the client to our application, as well as between different components of the application
* Performance - the computation speed of the program itself
* Parallelism - whether requests can be processes in parallel

We can increase throughput using the following strategies:

* Deploying our application geographically close to the client - generally, this reduces the number of hops that a request must make through proxy servers, and thus reduces network latency. We should also deploy components that depend on each other close together, preferably within the same data center. This also reduces network latency.
* Ensure servers have sufficient resources - make sure the CPU on your servers are sufficiently fast, and that the servers have enough memory to perform its tasks without having to use swap memory.
* Deploy multiple instances of an application behind a load balancer - this allows multiple requests to the application to be processed at the same time.
* Ensure your application code is non-blocking - JavaScript is an asynchronous language. If you write synchronous, blocking code, it will prevent other operations from executing whilst you wait for the synchronous operation to complete.

### 1.1.4. High Scalability

Scalability is a measure of how well a system can grow in order to handle higher demands, whilst still maintaining the same levels of performance.

The demand may arise as part of a sustained growth in user uptake, or it may be due to a sudden peak of traffic (e.g. a food delivery application is likely to receive more requests during lunch hours).

A highly scalable system should constantly monitor its constituent components and identify components which are working above a "safe" resource limit, and scale that component either _horizontally_ or _vertically_.

We can increase scalability in two ways:

* Scale Vertically or _scaling Up_ - increase the amount of resources (e.g. CPUs, RAM, storage, bandwidth) to the existing servers
* Scale Horizontally or _scaling out_ - adding servers to the existing cluster

![](https://geoserver.geo-solutions.it/edu/en/_images/Scale-Up-Out.png)

## 1.2. Clusters and Microservices

Now we know what is required of enterprise-grade applications, let's see how by breaking a monolithic application into many smaller _stateless_ components (following the microservices architecture) and deploying them in a cluster allows us to achieve the demanding requirements outlined above.

### 1.2.1. Microservices

Instead of having a monolithic code base that caters for many concerns, you break the application down into many services which, when working together, makes up the whole application. Each service should deal with only one or very few concerns.

A service should expose an API for other services to interact with, but would otherwise be independent from other services. This means services could be independently deployed and managed.

Writing our application that allows for a microservices architecture allows us to achieve:

* High Scalability - administrators can simply spawn more instances of an in-demand service. Because the services are independent of each other, they can be deployed independently, where the more in-demand services have more instances deployed.

Having Dockerized our applications, it makes implementing a microservices architecture much easier.

### 1.2.2. Clusters

To implement a reliable and scalable infrastructure, we must provide redundancy. This means redundancy in:

* hardware - we must deploy our application across multiple physical hosts, each (ideally) at different geographical locations. This is so that if one datacenter is offline or destroyed, services deployed at the other datacenters can keep our application running
* software - we must also deploy multiple instances of our services; this is so that the load of handling requests can be distributed across them. Consequently, this yields the following benefits:
    * We can route users to the server which provides them with the quickest response time (usually the one closest geographically to the user)
    * We can put one service offline, update it, and bring it back online without affecting the uptime of the entire application

Deploying applications on a cluster allows you to have hardware redundancy.

A cluster consists of a network of hosts / servers (called _nodes_). A load balancer, such as _HAProxy_ (High Availability Proxy), would sit in front of the nodes and distribute requests to the most available node.

By deploying redundant services on a cluster, it ensures:

* High Availability - if a server becomes unavailable, either through failure or planned maintanence, then the load balancer can implement a _failover_ mechanism and redistribute requests to the healthy instances.
* High Reliability - redundant instances remove _single point of failure_. It means our whole system becomes _fault-tolerant_.
* High Throughput - by having multiple instances of the service across geographical regions, it allows for low latency.

This may be implemented as an _Redundant Array Of Inexpensive Servers_ (RAIS), the server equivalent of RAID, or _Redundant Arrays Of Inexpensive Disks_. Whenever some server fails, the service will still be available by serving them from the healthy servers.

## 1.3. Cluster Management

Deploying our application in a microservices manner inside a cluster is simple enough in principle, but actually quite complex to implement.

First, you must _provision_ servers to act as nodes inside your cluster. Then, we'll need to set up a handful of tools that work in concert with each other to manage your cluster. These tools can be categorized into two groups:

* Those that works at the cluster level, and makes global decisions that affect the whole cluster
* Those that works at the node level, and manages individual nodes and communicate with the cluster-level tools

For the cluster-level tools, you'll need these:

* Scheduler - dictates which node a particular service will be deployed on
* Discovery Service - keeps a record of how many instances of each services are deployed, their states (e.g. starting, running, terminating etc.), where they're deployed etc. It allows for _service discovery_
* Global Configuration Store - stores cluster configurations such as common environment variables

On the node-level, you'll need the following tools:

* ??

Let's take a look at each one in more detail.

### 1.3.1. Cluster-Level Tools

#### 1.3.1.1. Discovery Service

At the moment, our API container can communicate with our Elasticsearch container because under the hood, they're connected to the same network, on the same host machine.

```
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
d764e66872cf        bridge              bridge              local
61bc0ca692fc        host                host                local
bdbbf199a4fe        none                null                local

$ docker network inspect bridge --format='{{range $index, $container := .Containers}}{{.Name}} {{end}}'
elasticsearch hobnob
```

However, if these containers are deployed on separate machines, using different networks, how can they communicate with each other?

For our API container, it must be able to obtain network information about the Elasticsearch container so it can send requests to it. One way to do this is by using a _service discovery_ tool.

With service discovery, whenever a new container (running a service) is initialized, it registers itself with the Discovery Service, providing information about itself, which includes its IP address. The Discovery Service then stores this information in a simple key-value store.

The service should update the Discovery Service regularly with it status, so that the Discovery Service always have an up-to-date state of the service at any time.

When a new service is initiated, it will query the Discovery Service to request information about the services it needs to connect with, such as their IP address. Then, the Discovery Service will retrieve these information from its key-value store and return it to the new service.

![](https://assets.digitalocean.com/articles/docker_ecosystem/Discover-Flow.png)

Popular service discovery tools includes:

* `etcd` by CoreOS (https://github.com/coreos/etcd)
* Consul by HashiCorp (https://www.consul.io/)
* Zookeeper by Yahoo, now an Apache Software Foundation (https://zookeeper.apache.org/)

#### 1.3.1.2. Scheduler

Whilst the Discovery Service holds information about the state and location of each service, it does not make the decision of which host / node the service should be deployed on. This process is known as _host selection_ and is the job of a _scheduler_.

![](https://assets.digitalocean.com/articles/docker_ecosystem/Example-Schedule-App-F.png)

The scheduler's decision can be based on a set of rules, called _policies_, which takes into account the following:

* The nature of the request
* Cluster configuration / settings
* Host density - an indication of how busy a the host system on the node is. If there are multiple nodes inside the cluster, we should prefer to deploy any new services on a node with the lowest host density. This information can be obtained from the Discovery Service, which holds information about all deployed services.
* Service affinity - whether two services should be deployed together on the same host. This depends on:
  * Redundancy requirements - for instance, if our API service have already been deployed on two of three hosts, the scheduler may prefer to deploy on the remaining host to ensure maximum redundancy
  * Data locality - the scheduler should try placing computation code next to the data it needs to consume to reduce network latency
* Resource requirements - of existing services running on nodes, as well as the service to be deployed
* Other rules set by the cluster administrator

#### 1.3.1.3. Global Configuration Store

Oftentimes, as is the case with our services, environment variables needs to be set before the service can run successfully. So far, we've specified the environment variables to use by using the `--env-file` to `docker run`.

```
$ docker run --env-file ./.env --name hobnob -d -p 8080:8080 hobnob:0.1.0
```

However, when deploying services on a cluster, we no longer run each container manually - we let the scheduler and node-level tools do it for us. Furthermore, we need all our services to share the same environment variables. Therefore, the most obvious solution is to provide a _Global Configuration Store_ that stores configuration that is to be shared amongst all the nodes and services.

##### 1.3.1.3.1. Discovery Service & Global Configuration Store, Together

Because the Discovery Service and Global Configuration Store both holds information about the services, and each are accessible by all nodes, many Discovery Services also acts as Global Configuration Stores. Whenever a service registers itself with the Discovery Service, it will be returned a set of configuration settings.

#### 1.3.1.4. Provisioning Tools

Provisioning means starting new hosts (be it physical or virtual) and configuring them in a way that allows them to run Cluster Management Tools. After provisioning, the host is ready to become a node inside the cluster and can receive work.

This may involve using Infrastructure Management tools like Terraform to spin up new hosts, and Configuration Management tool like Puppet, Chef, Anisble or Salt, to ensure the configuration set inside each host is consistent with each other.

Whilst provisioning can be done before deploying our application, most Cluster Management software have a provisioning component built into it.

### 1.3.2. Node-Level Tools

Node-Level tools resides within each node and communicates with cluster-level tools to run and manage services running inside it.

#### 1.3.2.1. Local Configuration Management Tool

We have our cluster configurations stored inside the Global Configuration Store; however, we also need a way to retrieve those settings into each node. Furthermore, when those configurations are changed, we need a way to fetch the updated configuration and reload the application /services if required.

`confd` (https://github.com/kelseyhightower/confd) is the most popular Configuration Management Tool

#### 1.3.2.2. Container Runtime

If programs are ran inside containers, then we must ensure that the runtime for the container format is available inside each node.

#### 1.3.2.3. ??

We also need to ensure that there's a program inside each Node to report to the `etcd` their current status. This may be done in a top-down approach, where the Discovery Service will query each node at a regular basis for their status; or it may be done in a bottom-up approach, where each node actively sends updates to the Discovery Service.

### 1.3.3. Cluster Management Tools

However, having to manage these different services individually is tedious and error-prone. Luckily, Cluster Management Tools exists that provides a common API that allows to configure these tools in a consistent manner. You'd use the Cluster Management Tool's API instead of manipulating each component individually.

> Cluster Managements Tools are also known as _cluster orchestration tool_ or _container orchestration tool_

You'd specify the desired state of your cluster using configuration files, and the Cluster Management Tool will handle everything to bring the cluster to that state. This may include deployment and management of the cluster management tools like scheduler, the Discovery Service and Global Configuration Stores, provisioning machines to act as nodes etc.

There are a few popular Cluster Management Tools available today:

* Marathon (https://mesosphere.github.io/marathon/) - by Mesosphere and runs on Apache Mesos
* Swarm (https://docs.docker.com/engine/swarm/) - the Docker engine includes a _swarm mode_ that manages Docker containers in clusters called _swarms_. You may also group certain containers together using Docker Compose.
* Kubernetes - has since become the _de facto_ cluster management tool

Using a Cluster Management Tool provides automation into the cluster deployment workflow.

Although configuration of the cluster can be specified with code. For live environments, administrators should have the option to tweak settings and configurations on-the-fly. Therefore, most Cluster Management Tools also provide a Web UI, which allows you to visualize and administer your cluster with ease.

We will be using Kubernetes because it has the most mature ecosystem, and is the _de facto_ industry standard.

## 1.4. Getting Started with Kubernetes

As I have previously aluded to - Kubernetes handles the messy business of co-ordinating with schedulers, service discovery and configration storage. This often consists of sending a request to one component, receiving a response, and based on that response Kubernetes will send another requests to another component.

But for us, we just need to tell Kubernetes the desired state of our cluster, and Kubernetes will automatically co-ordinate to make it happen. Here are some of the components that Kubernetes control:

* Discovery Service and Global Configuration Store - `etcd`
* Scheduler - `kube-scheduler`
* API Server - `kube-apiserver`
* Local Configuration Management Tool and ?? - `kubelet`

Kubernetes runs as a daemon that exposes a RESTful Kubernetes API server (`kube-apiserver`). Although we can communicate with Kubernetes by sending raw HTTP requests to the API server, Kubernetes provides a convenient `kubectl` client which have methods that allows you to easily send requests to the `kube-apiserver`.

Now that you understand the different parts of a Cluster Management System and how they relate to each other, let's get hands on and create a new cluster with Kubernetes.

#### 1.4.0.1. Cleaning Our Environment

We are now going to deploy our application using Kubernetes, which manages our application containers for us; therefore, we no longer need to manage our own Docker containers.

So make it clearer the role Kubernetes is doing, let's provide a clean working environment by first removing any Docker containers and images related to our application. You can do this by running `docker stop <container>`, `docker rm <container>` and `docker rmi <image>`

### 1.4.1. Setting Up Local Development Environment

To run Kubernetes locally, your machine need to fulfill the following hardware requirements:

* Have 2GB or more of available RAM
* Have 2 or more CPU cores
* Swap space is disabled

If those requirements are satisfied, the next item on our to-do list is to install the Kubernetes daemon

#### 1.4.1.1. Installing Minikube

Minikube is a free and open-source tool by the Kubernetes team that allows you to run a single-node Kubernetes cluster locally. Let's install it.

Go to https://github.com/kubernetes/minikube/releases and follow the instructions to install the latest version of Minikube. For Ubuntu, we can choose to either run the install script or install the `.deb` package.

At the time of this writing, the `.deb` package installation is still experimental, so we will opt for the install script instead. For example, to install Minikube v0.27.0, we can run:

```
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.27.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

#### 1.4.1.2. Turning Off Swap

Running Kubernetes locally requires you to turn Swap Memory off. You can do so by running `swapoff -a`

```
$ sudo swapoff -a
```

#### 1.4.1.3. Installing a Hypervisor or Docker Machine

Normally, Minikube runs a single-node cluster inside a Virtual Machine (VM), and this requires the installation of a hypervisor like VirtualBox or KVM. This requires a lot of set up.

However, we can instruct Minikube to run Kubernetes component directly on our machine outside of any VMs. This requires the Docker runtime and Docker Machine to be installed on our machine. Docker runtime is already installed, so let's install Docker Machine.

```
$ base=https://github.com/docker/machine/releases/download/v0.14.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo install /tmp/docker-machine /usr/local/bin/docker-machine
```

After installation, run `docker-machine version` to confirm the installation is successful.

```
$ docker-machine version
docker-machine version 0.14.0, build 89b8332
```

> Minikube is only available on Linux machines. If you are not using a Linux machine, go to the Minikube documentation to follow instructions on setting up a VM environment and using a VM driver.
> The rest of the chapter will still work for you. Just remember to use the correct `--vm-driver` flag when running `minikube start`

#### 1.4.1.4. Installing `kubectl`

Next, we should install `kubectl`. This will allow us to interact with the Kubernetes API through the command line without having to manually send HTTP requests with `curl`. Minikube also depends on `kubectl`.

Just like with `minikube`, we can install `kubectl` by downloading the binary and moving it to `/usr/local/bin`.

```
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.10.3/bin/linux/amd64/kubectl && chmod +x ./kubectl && sudo mv ./kubectl /usr/local/bin/kubectl
```

> You can find alternate installation methods at https://kubernetes.io/docs/tasks/tools/install-kubectl/

Check that installation is successful by running `kubectl version`.

One last thing - `kubectl` provides autocompletion. To activate it, simply run this:

```
$ echo "source <(kubectl completion bash)" >> ~/.bashrc
```

### 1.4.2. Starting Our Cluster

With the Kubernetes daemon (part of `minikube`) and the Kubernetes client (`kubectl`) installed, we can now run `minikube start` to create and start our cluster. We'd need to pass in a `--vm-driver=none` as we are not using a VM.

We need to run the `minikube start` command as `root` because the `kubeadm` and `kubelet` binaries needs to be downloaded and moved to `/usr/local/bin`, which requires root priviledges.

However, this usually means that all the files created and written during the installation and initiation process will be owned by `root`. This makes it hard for our normal user to modify configuration files etc.

Fortunately, Kubernetes provides several environment variables we can set to change this.

#### 1.4.2.1. Setting Environment Variables for Local Cluster

Inside `.profile` (or its equivalents such as `.bash_profile` or `.bashrc`), add the following lines at the end:

```
export MINIKUBE_WANTUPDATENOTIFICATION=false
export MINIKUBE_WANTREPORTERRORPROMPT=false
export MINIKUBE_HOME=$HOME
export CHANGE_MINIKUBE_NONE_USER=true
export KUBECONFIG=$HOME/.kube/config
```

`CHANGE_MINIKUBE_NONE_USER` will tell `minikube` to assign the current user as the owner of the configuration files stored at `~/.kube` and `~/.minikube`.

Now `source` the configuration file to apply these environment variables to the current shell.

```
$ . .profile
```

Lastly, we'd also need to add a configuration file to our home directory.

```
$ mkdir -p $HOME/.kube
$ touch $HOME/.kube/config
```

#### 1.4.2.2. Running `minikube start`

Now we're finally ready to run `minikube start`.

```
$ sudo -E minikube start --vm-driver=none
Starting local Kubernetes v1.10.0 cluster...
Starting VM...
Downloading Minikube ISO
 150.53 MB / 150.53 MB [============================================] 100.00% 0s
Getting VM IP address...
Moving files into cluster...
Downloading kubeadm v1.10.0
Downloading kubelet v1.10.0
Finished Downloading kubelet v1.10.0
Finished Downloading kubeadm v1.10.0
Setting up certs...
Connecting to cluster...
Setting up kubeconfig...
Starting cluster components...
Kubectl is now configured to use the cluster.
===================
WARNING: IT IS RECOMMENDED NOT TO RUN THE NONE DRIVER ON PERSONAL WORKSTATIONS
	The 'none' driver will run an insecure kubernetes apiserver as root that may leave the host vulnerable to CSRF attacks

Loading cached images from config file.
```

This command performs several operations under the hood:

* Provision any VMs (if we're using VM). This is done internally by `libmachine` from Docker Machine
* Set up configuration files and certificates under `./kube` and `./minikube`
* Start up the local Kubernetes cluster using `localkube`
* Configure `kubectl` to communicate with this cluster

Since we are developing locally using the `--vm-driver=none` flag, we now how cluster-level tools, such as the scheduler (`kube-scheduler`), as well as node-level tools, such as `kubelet`, running on our machine. Under the hood, the Kubernetes cluster is being ran by many services running inside Docker containers. You can check them out by running `docker ps`.

```
$ docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Names}}"
CONTAINER ID        IMAGE                        COMMAND                  NAMES
3ff67350410a        4689081edb10                 "/storage-provisioner"   k8s_storage-provisioner_storage-provisioner_kube-system_4d9c2fa3-627a-11e8-a0e4-54e1ad13e25a_0
ec2922978b10        e94d2f21bc0c                 "/dashboard --insecu…"   k8s_kubernetes-dashboard_kubernetes-dashboard-5498ccf677-sslhz_kube-system_4d949c82-627a-11e8-a0e4-54e1ad13e25a_0
f9f5b8fe1a41        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_storage-provisioner_kube-system_4d9c2fa3-627a-11e8-a0e4-54e1ad13e25a_0
f5b013b0278d        6f7f2dc7fab5                 "/sidecar --v=2 --lo…"   k8s_sidecar_kube-dns-86f4d74b45-hs88j_kube-system_4cbede66-627a-11e8-a0e4-54e1ad13e25a_0
f2d120dce2ed        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kubernetes-dashboard-5498ccf677-sslhz_kube-system_4d949c82-627a-11e8-a0e4-54e1ad13e25a_0
50ae3b880b4a        c2ce1ffb51ed                 "/dnsmasq-nanny -v=2…"   k8s_dnsmasq_kube-dns-86f4d74b45-hs88j_kube-system_4cbede66-627a-11e8-a0e4-54e1ad13e25a_0
a8f677cdc43b        80cc5ea4b547                 "/kube-dns --domain=…"   k8s_kubedns_kube-dns-86f4d74b45-hs88j_kube-system_4cbede66-627a-11e8-a0e4-54e1ad13e25a_0
d287909bae1d        bfc21aadc7d3                 "/usr/local/bin/kube…"   k8s_kube-proxy_kube-proxy-m5lrh_kube-system_4cbf007c-627a-11e8-a0e4-54e1ad13e25a_0
e14d9c837ae4        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kube-dns-86f4d74b45-hs88j_kube-system_4cbede66-627a-11e8-a0e4-54e1ad13e25a_0
896beface410        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kube-proxy-m5lrh_kube-system_4cbf007c-627a-11e8-a0e4-54e1ad13e25a_0
9f87d1105edb        52920ad46f5b                 "etcd --listen-clien…"   k8s_etcd_etcd-minikube_kube-system_a2c07ce803646801a9f5a70371449d58_0
570a4e5447f8        af20925d51a3                 "kube-apiserver --ad…"   k8s_kube-apiserver_kube-apiserver-minikube_kube-system_8900f73fb607cc89d618630016758228_0
87931be974c0        9c16409588eb                 "/opt/kube-addons.sh"    k8s_kube-addon-manager_kube-addon-manager-minikube_kube-system_3afaf06535cc3b85be93c31632b765da_0
897928af3c85        704ba848e69a                 "kube-scheduler --ad…"   k8s_kube-scheduler_kube-scheduler-minikube_kube-system_31cf0ccbee286239d451edb6fb511513_0
b3a7fd175e47        ad86dbed1555                 "kube-controller-man…"   k8s_kube-controller-manager_kube-controller-manager-minikube_kube-system_c871518ac418f1edf0247e23d5b99a40_0
fd50ec94b68f        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kube-apiserver-minikube_kube-system_8900f73fb607cc89d618630016758228_0
85a38deae7ad        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_etcd-minikube_kube-system_a2c07ce803646801a9f5a70371449d58_0
326fd83d6630        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kube-addon-manager-minikube_kube-system_3afaf06535cc3b85be93c31632b765da_0
e3dd5b372dab        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kube-scheduler-minikube_kube-system_31cf0ccbee286239d451edb6fb511513_0
6c2ac7c363d0        k8s.gcr.io/pause-amd64:3.1   "/pause"                 k8s_POD_kube-controller-manager-minikube_kube-system_c871518ac418f1edf0247e23d5b99a40_0
```

Running `minikube start` also set up our local machine as a node inside the cluster. You can confirm this by using `kubectl` to see whether the node is registered with the Kubernetes API and `etcd`.

```
$ kubectl get nodes
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     master    15m       v1.10.0
```

As a last check, run `systemctl status kubelet.service` to ensure `kubelet` is running as a daemon on the node.

```
$ sudo systemctl status kubelet.service
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/lib/systemd/system/kubelet.service; enabled; vendor preset: enable
  Drop-In: /etc/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: active (running) since Mon 2018-05-28 14:22:59 BST; 2h 5min ago
     Docs: http://kubernetes.io/docs/
 Main PID: 23793 (kubelet)
    Tasks: 18 (limit: 4915)
   Memory: 55.5M
      CPU: 8min 28.571s
   CGroup: /system.slice/kubelet.service
           └─23793 /usr/bin/kubelet --fail-swap-on=false --allow-privileged=true --clu
```

Everything is now set up, you can confirm by running `minikube status` and `kubectl cluster-info`.

```
$ minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 10.122.35.199

$ kubectl cluster-info
Kubernetes master is running at https://10.122.35.199:8443
KubeDNS is running at https://10.122.35.199:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

#### 1.4.2.3. A Note on Staleness

If you change the local network that your computer is connected to, the cluster's IP may change. When you try to use `kubectl` to connect to the cluster, you'lll see an error saying that the `network is unreachable`

```
$ kubectl cluster-info
Kubernetes master is running at https://10.122.35.199:8443
Unable to connect to the server: dial tcp 10.122.35.199:8443: connect: network is unreachable
```

You can check the state of the cluster by running `minikube status`.

```
$ minikube status
minikube: Running
cluster: Running
kubectl: Misconfigured: pointing to stale minikube-vm.
To fix the kubectl context, run minikube update-context
```

In this case, it informs us that the `kubectl` is "pointing to stale `minikube-vm`" and we should run `minikube update-context`.

```
$ minikube update-context
Reconfigured kubeconfig IP, now pointing at 192.168.1.11
```

After doing this, check that `kubectl` is able to communicate with the Kubernetes API server.

```
$ kubectl cluster-info
Kubernetes master is running at https://192.168.1.11:8443
KubeDNS is running at https://192.168.1.11:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

If that doesn't work, use `kubeadm reset` to reset everything related to our Kubernetes cluster, afterwhich we can start again.

```
$ sudo kubeadm reset
[preflight] Running pre-flight checks.
[reset] Stopping the kubelet service.
[reset] Unmounting mounted directories in "/var/lib/kubelet"
[reset] Removing kubernetes-managed containers.
[reset] No etcd manifest found in "/etc/kubernetes/manifests/etcd.yaml". Assuming external etcd.
[reset] Deleting contents of stateful directories: [/var/lib/kubelet /etc/cni/net.d /var/lib/dockershim /var/run/kubernetes]
[reset] Deleting contents of config directories: [/etc/kubernetes/manifests /etc/kubernetes/pki]
[reset] Deleting files: [/etc/kubernetes/admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/bootstrap-kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf]
```

Now, run the same `minikube start` command as before and it should work again.

```
$ sudo -E minikube start --vm-driver=none
$ minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.1.11
$ kubectl cluster-info
Kubernetes master is running at https://192.168.1.11:8443
KubeDNS is running at https://192.168.1.11:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

### 1.4.3. Creating Our First Pod

Now that we have a cluster running locally, let's deploy some services on it. With Kubernetes, all services run inside containers. Conveniently for us, we are already familiar with Docker, and Kubernetes supports the Docker container format.

However, Kubernetes doesn't actually deploy containers individually, but rather, it deploys _pods_.

Simply put, pods are a logic grouping of containers that should be managed together.

Pods are a type of Kubernetes _Objects_. ?? Objects are entities that Kubernetes understands and work with. We will shortly be introducing you to another Kubernetes object - Deployment - but Pods are the lowest-level entity that Kubernetes manages.

Containers inside the same pod shares:

* Lifecycle - all containers inside a pod is managed as a single unit. When a pod starts, all the containers inside the pod will start (shared fate). When a pod needs to be relocated to a different node, all containers inside the pod will relocate (co-scheduling).
* Context - a pod is isolated from other pods similar to how one Docker container is isolated from another Docker container. In fact, Kubernetes use the same mechanism of namespaces and cgroups to isolate a pod.
* Shared network - all containers within the pod shares the same IP address and port space, and can communicate with each other using `localhost:<port>`. They can also communicate with each other using inter-process communications (IPC)
* Shared storage - containers can access a shared volume that will be persisted outside of the container, and will survive even if the containers restart.

![](https://d33wubrfki0l68.cloudfront.net/aecab1f649bc640ebef1f05581bfcc91a48038c4/728d6/images/docs/pod.svg)

#### 1.4.3.1. Run Pods with `kubelet`

To get some hands-on experience, let's deploy our Elasticsearch service inside a Pod.

Pods are ran by the `kubelet` service that runs inside each node. There are three ways to instruct `kubelet` to run a Pod:

1. By directly passing it the Pod configuration file (or a directory container configuration files) using `kubelet --config <path-to-pod-config>`. `kubelet` will poll this directory every 20 seconds for changes, and will start new containers or terminate containers based on any changes to the configuration file(s).
2. Specify an HTTP endpoint which returns with the Pod configuration files. Like the file option, `kubelet` poll the endpoint every 20 seconds.
3. Using the Kubernetes API server to send any new pod manifests to `kubelet`

The first two options are not ideal because:

1. It relies on polling, which means the nodes cannot react quickly to changes
2. The Kubernetes API server is not aware of these pods, and thus cannot manage them

Therefore, to run our Pod, we should use `kubectl` to talk to the Kubernetes API server and deploy our Pod.

#### 1.4.3.2. Running Elasticsearch inside a Pod with `kubectl run`

First, confirm that no Elasticsearch containers are currently running on our machine.

```
$ docker ps -a \
  --filter "name=elasticsearch" \
  --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Names}}"
CONTAINER ID        IMAGE               COMMAND             NAMES
```

We can now use `kubectl run` to run an image inside a Pod, and deploy it onto our cluster.

```
$ kubectl run elasticsearch --image=docker.elastic.co/elasticsearch/elasticsearch-oss:6.3.2 --port=9200 --port=9300
deployment.apps "elasticsearch" created
```

Now, when we check the Pods deployed onto our cluster, we can see the one we just deployed.

```
$ kubectl get pods
NAME                             READY     STATUS    RESTARTS   AGE
elasticsearch-759db9ff65-zgw4t   1/1       Running   0          6s
```

#### 1.4.3.3. Understanding Kubernetes Objects

The more observant of you might have noticed the following output after you ran `kubectl`.

```
deployment.apps "elasticsearch" created
```

It mentions `deployment`, which you may have associated with the Deployment Kubernetes object that was briefly mentioned earlier. So what is a Deployment?

##### 1.4.3.3.1. Deployment

By default, the `kubectl run` command does not create a Pod directly, instead, it creates a _Deployment_ object. Therefore, the following two commands are functionally equivalent:

```
$ kubectl run <name> --image=<image>
$ kubectl create deployment <name> --image=<image>
```

To demonstrate, you can see a list of active Deployments using `kubectl get deployments`.

```
$ kubectl get deployments
???
```

The benefit of using a Deployment object is that it will manage the Pods under its control. After creating the Pods, a Deployment will continue to monitor the Pod and restart it if it fails.



Generally, you should not _imperatively_ instruct Kubernetes to create a low-level object like Pods, but create a higher-level Kubernetes object _declaratively_, and Kubernetes will manage the low-level objects for you.

persistent entities

##### 1.4.3.3.2. ReplicaSet

For example, you can create a new _ReplicaSets_ object, declaratively specify the number of replicas you want for a particular Pod, and Kubernetes will manage it for you.

In fact, you won't normally use ReplicaSet independently neither; instead, a Deployment object uses ReplicaSet under the hood.

##### 1.4.3.3.3. DaemonSet

Like the ReplicaSet, the DaemonSet object will create and manage replicas for you. But instead of specifying a number of instances to run, a DaemonSet is intended to run on every node.

##### 1.4.3.3.4. Pod

### 1.4.4. Declarative over Imperative

Pods, Deployments, ReplicaSet are examples of Kubernetes objects. Kubernetes provide you with multiple approaches to run and manage them.

* `kubectl run` - imperative - you provide instructions to the Kubernetes API to perform through the command line
* `kubectl create` - imperative - you provide instructions to the Kubernetes API to perform through a file
* `kubectl apply` - declarative - you tell Kubernetes API the desired state of your cluster using file(s), and Kubernetes will figure out the operations required to reach that state

`kubectl create` is a slight improvement to `kubectl run` because the configuration file can now be version control; however it is still not ideal due to its imperative nature.

If we use the imperative approach, we'd be manipulating the Kubernetes object(s) directly, and thus be responsible for keeping track of all Kubernetes objects at the same time. This essentially defeats the point of having a Cluster Management Tool.

The preferred pattern is to create a pod in a declarative manner using a version-controlled manifest file.

You should also note that the imperative and declarative approaches are mutually-exclusive - you cannot have Kubernetes manage everything based on your configuration, and also manipulate objects on your own. This is because Kubernetes will detect the changes you've made as deviation from the desired state, and will work against you and effectively undo your changes. Therefore, we must decide which approach to use.

<table>
<thead>
<tr>
<th>Management technique</th>
<th>Operates on</th>
<th>Recommended environment</th>
<th>Supported writers</th>
<th>Learning curve</th>
</tr>
</thead>
<tbody>
<tr>
<td>Imperative commands</td>
<td>Live objects</td>
<td>Development projects</td>
<td>1+</td>
<td>Lowest</td>
</tr>
<tr>
<td>Imperative object configuration</td>
<td>Individual files</td>
<td>Production projects</td>
<td>1</td>
<td>Moderate</td>
</tr>
<tr>
<td>Declarative object configuration</td>
<td>Directories of files</td>
<td>Production projects</td>
<td>1+</td>
<td>Highest</td>
</tr>
</tbody>
</table>

#### 1.4.4.1. Controllers

The actual job of managing Kubernetes objects falls to _controllers_. For example, when we create a Deployment, a _Deployment controller_ manages the Pods and ReplicaSet specified from the configuration. It is the controller who is responsible for making changes to get the actual state to the desired state.

A ReplicaSet object is managed by a ReplicaSet controller. A DaemonSet is managed by the DaemonSet controller etc.

#### 1.4.4.2. Deleting Deployment

We're going to change our deployment approach to using the declarative `kubectl apply`. But first, we must delete our existing Deployment. We can do that with `kubectl delete`.

```
$ kubectl delete deployment elasticsearch
```

We can confirm our Deployment is deleted by running `kubectl get deployments`.

```
$ kubectl get deployments
No resources found.
```

#### 1.4.4.3. Running a Pod Declaratively with `kubectl apply`

Now, create a new directory called `manifests`, and in it, create a new file called `elasticsearch.yaml` and add the following Deployment configuration.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elasticsearch
spec:
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      name: elasticsearch
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch-oss:6.3.2
        ports:
        - containerPort: 9200
        - containerPort: 9300
```

The configuration file consists of several fields (fields marked `*` are required):

* `apiVersion*` - the version of the API. This affects the scheme expected for the configuration file. The API is broken into modular _API Groups_. This allows Kubernetes contributes to develop newer features independently. It also provides Kubernetes cluster administrators more fine-grained control over which API features they want enabled.
  The core Kubernetes objects are available in the _core_ group (a.k.a. _legacy_ group), and you can specify this by using `v1` as the `apiVersion` property value. Deployments are available under the `apps` group and we can enable it by using `apps/v1` as the `apiVersion` property value. Other groups includes `batch` (provides the `CronJob` object), `extensions`, `scheduling.k8s.io`, `settings.k8s.io` and many more
* `kind*` - the type of resource this manifest is specifying. In our case, we want to create a Deployment, so we should specify `Deployment` as the value. Other valid values for `kind` includes `Pod` and `ReplicaSet`, but for reasons mentioned above, you wouldn't normally use them.
* `metadata` - metadata about the Deployment, such as:
  * `namespace` - with Kubernetes, you can split a single physical cluster into multiple _virtual clusters_. The default namespace is `default`, which is sufficient for our use case.
  * `name` - a name to identify the Deployment within the cluster
* `spec` - details the behaviour of the Deployment, such as:
  * `template` - the specification for each Pod in the ReplicaSet
    * `metadata` - metadata about the Pod, including a `label` property
    * `spec` - specification for each individual Pod:
      * `containers` - a list of containers that belongs in the same Pod and should be managed together
  * `selector` - the method by which the Deployment controller knows which Pods it should manage. We use the `matchLabels` criteria to match all Pods with the label `app: elasticsearch`, which we've added to `spec.template.metadata.labels` and applies to all Pods.
  * `replicas` - the number of replica Pods, specified in the `spec.template`, to deploy

We have Now, we can run `kubectl apply`.

```
$ kubectl apply -f manifests/elasticsearch.yaml
deployment.apps "elasticsearch" created
```

This will trigger a set of events of occur:

1. `kubectl` sends the Deployment manifest to the Kubernetes API server (`kube-apiserver`). `kube-apiserver` will assign it a unique ID, and adds it onto `etcd`.
2. The API server will also create the corresponding `ReplicaSet` and `Pod` objects and add it to `etcd`.
2. The scheduler watches `etcd` and notices that there are Pods that have not been assigned to a node. Then, the scheduler will make a decision about where to deploy the Pods specified by the Deployment.
3. Once it's made a decision, it will inform `etcd` of its decision, which then records the decision.
4. The `kubelet` service running on each node that the Pod is assigned to will notice this change, and run a new Pod according to the Pod's specification.

During the entire process, the scheduler and `kubelet`s keeps `etcd` up-to-date _at all times_ via the Kubernetes API.

For instance, if we query for the state of the Deployment in the first few seconds after we ran `kubectl apply`, we will see that `etcd` have updated its records with our desired state, but the Pods and containers would not be available yet.

```
$ kubectl get deployments
NAME            DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
elasticsearch   3         3         3            0           2s
```

> **What the Numbers Mean?**
> `DESIRED` - the desired number of replicas
> `CURRENT` - the current number of replicas
> `UP-TO-DATE` - the current number of replicas that has the most up-to-date configuration (has the copy of the latest Pod template / manifest)
> `AVAILABLE` - the number of replicas available to users

We can then run `kubectl rollout status` to be notified, in real-time, when each Pod get is ready.

```
$ kubectl rollout status deployment/elasticsearch
Waiting for rollout to finish: 0 of 3 updated replicas are available...
Waiting for rollout to finish: 1 of 3 updated replicas are available...
Waiting for rollout to finish: 2 of 3 updated replicas are available...
deployment "elasticsearch" successfully rolled out
```

Then, we can check the deployment again, and we can see that all three replica Pods are available.

```
$ kubectl get deployments
NAME            DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
elasticsearch   3         3         3            3           2m
```

To solidify your understanding that our Deployment object is managing ReplicaSet object, you can run `kubectl get rs` to get a list of ReplicaSet in the cluster.

```
$ kubectl get rs
NAME                       DESIRED   CURRENT   READY     AGE
elasticsearch-699c7dd54f   3         3         3         3m
```

The name of a ReplicaSet is automatically generated from the name of the Deployment object that manages it, and a hash value derived from the Pod template.

```
<deployment-name>-<pod-template-hash>
```

Therefore, we know that the `elasticsearch-699c7dd54f` ReplicaSet is managed by the `elasticsearch` deployment.

Using the same logic, you can run `kubectl get pods` to see a list of Pods.

```
$ kubectl get pods --show-labels
NAME                             READY     STATUS    RESTARTS   AGE       LABELS
elasticsearch-699c7dd54f-54cf6   1/1       Running   0          3m        app=elasticsearch,pod-template-hash=2557388109
elasticsearch-699c7dd54f-kmlqm   1/1       Running   0          3m        app=elasticsearch,pod-template-hash=2557388109
elasticsearch-699c7dd54f-lxs9t   1/1       Running   0          3m        app=elasticsearch,pod-template-hash=2557388109
```

Again, the name of the Pod is the name of its controlling ReplicaSet and a unique hash.

You can also see that the Pods have a `pod-template-hash=2557388109` label applied to it. The Deployment and ReplicaSet uses this label to identify which Pods it should be managing.












































### 1.4.5. Visualizing Deployment using Web UI Dashboard

https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

```
$ minikube dashboard
```


### 1.4.6. Exposing Services

Due to the ephemeral nature of Pods, the IP addresses for Pods running a particular service may change. For instance, the scheduler may kill Pods running on a busy node, and re-deploy it on a more available node.

However, the consumers of our service needs to have a stable IP to call. Therefore, Kubernetes provides the _Service_ object. A Service object groups multiple Pods together and give them each a virtual IP addresses (cluster IP)

??
```
$ minikube ip
```

To expose a service to be accessible to our host machine, we must _expose_ it and set it to the _NodePort_ type.

```
$ kubectl expose deployment elasticsearch --type=NodePort
service "elasticsearch" exposed
```

This service can now be accessed through the `NodePort` on the IP. If you've forgotten which port this is, you can run

```
kubectl get service elasticsearch --output='jsonpath="{.spec.ports[0].nodePort}"'
```
??

Now that we know what Pods and Deployments are, let's add other components of our application into the Deployment.

Generally, you should only group tightly-coupled containers together in the same pod. Ideally, each Pod would contain all the components to provide a specific, but complete service.

In Chapter 21, when we add logging to our application to make it easier to maintain, we would group the log tailing service alongside our API server, running two containers inside the same Pod. However, for now, we will run single-container Pods.

To services running on one pod to communicate with services on another pod, they must do so through the pod's IP address - they will not be able to communicate directly with a container.


You can get the URL of the exposed service using `minikube service`.

```
$ minikube service --url elasticsearch
```

Delete a service.

```
$ kubectl delete service elasticsearch
service "elasticsearch" deleted
```




kubelet
apiserver
proxy
controller-manager
etcd
scheduler




### 1.4.7. Networking

https://kubernetes.io/docs/concepts/cluster-administration/networking/

Every container inside a Kubernetes cluster has an associated IP address.

#### 1.4.7.1. Overlay Network

https://jvns.ca/blog/2016/12/22/container-networking/
http://blog.sophaskins.net/blog/misadventures-with-kube-dns/



* network namespaces (understanding namespaces in general is really helpful for working with containers)
* DNS (because Kubernetes has a DNS server)
* route tables, how to run ip route list and ip link list
* network interfaces
* encapsulation (vxlan / UDP)
* basics about how to use iptables & read iptables configuration
* TLS, server certs, client certs, certificate authorities




#### 1.4.7.2. Pods

We have separated our application into independent services, where each can be deployed and managed separately. However, for more complex applications, sometimes it makes sense to group related services together in order to deploy and manage them as a single unit, perhaps because one services always requires the other services in the group. Pods allows you to do this.




For instance, the scheduler may send a _manifest_ outlining some work to be done.

When a container is created using Kubernetes, --- > PodSpecs

kubelet ensures these containers are running and healthy.

> kubelet - The primary node agent that runs on each node. The kubelet takes a set of PodSpecs and ensures that the described containers are running and healthy.















### 1.4.8. Deploying Our API Service

https://kubernetes.io/docs/getting-started-guides/minikube/#using-minikube-with-an-http-proxy








### 1.4.9. Controllers

Controllers queries `etcd` periodically in order to watch for changes in the state of the cluster. If a change is detected, controllers triggers a set of procedures that'll return the cluster to the desired state.

There are many types of controllers:

* Node controllers - watch for when a node goes down, and re-spawn the node
* Replication controller - if a running service exits unexpectedly, this will reduce the number of replicas. The replication controller should notice this and re-initiate a new service
* Endpoint Controller - ??
* Service Account & Token Controllers - ??

Kubernetes uses the `kube-controller-manager` controller. The `kube-controller-mananger` combines all the controllers above into a single binary that runs as a single process.

#### 1.4.9.1. Cloud Provider Controller

Apart from the controller specified above, Kubernetes also relies on `cloud-controller-manager` to interact with each cloud provider's API.

Since every Cloud Provider has a different API, the Cloud Controller Manager translate a common Kubernetes instruction to a set of API requests that are specific to that cloud provider.

Certain features are not available to be configured using Minikube, such as load balancers. We will now take what we've learnt and deploy our application to the internet using the same cloud provider - DigitalOcean.

### 1.4.10. Distributed Lock Manager

When 

 - accesses cluster-wide lock database in order to synchronize each node's access to shared resources, such as shared filesystems


### 1.4.11. Summary

* You have a combined Discovery Service and Global Configuration Store that keeps track of the current and desired state of the cluster.
* You have an API which allows you to update the settings and configuration stored in the Global Configuration Store.
* You have a scheduler which distribute the services amongst the nodes. It takes information from the Discovery Service and Global Configuration Store in order to understand the capacity of each host, which services are already deployed there, and its current workload. Based on these information, the scheduler decides and manages which services are deployed where.
* You have a set of controllers that keeps watch on changes in the configuration and settings of the cluster, and constantly try to move the cluster to the desired state.
  For instance, if the administrator wants an additional replica for a given service, it can do so by using the API to update the Global Configuration Store. The controller will then detect this and instruct the scheduler to spawn a new instance in the most appropriate node.
* 


## 1.5. Cleaning things up

If you'd like to temporary stop the cluster, you can ues `minikube stop`. This will shut down any associated virtual machines or stop Docker containers, but any cluster-level states are maintained.

If you're completely done with the cluster, you can use `minikube delete`. This will shut down and remove any associated virtual machines or stop Docker containers. All cluster- and node-level states are removed.











## 1.6. Statelessness

Every component in the Kubernetes system can be stateless except `etcd`. This allows the different components to be destroyed and re-deployed on different nodes easily.



## 1.7. Overview

Kubernetes is a system that automates the deployment and management of containerized applications across a cluster of machines.

A cluster consists of multiple hosts, both physical and virtual, which may have varied hardware architecture and operating system.

![](https://1npo9l3lml0zvr6w62acc3t1-wpengine.netdna-ssl.com/wp-content/uploads/2016/12/Screen-Shot-2016-12-14-at-9.25.36-PM.png)

In the context of Kubernetes, the term encompasing all physical or virtual host machines under its control is called a _Cluster_. Each individual host inside the cluster is termed a _Node_. Nodes can run multiple _Pods_, which are simply a group of containers.

Pods
Nodes



http://opensourcebridge.org/proposals/1375
Kubernetes utilizes `etcd` to store all its cluster data. Used for:

* service discovery
* leader election
* distributed locking using Raft consensus algorithm

https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html


## 1.8. Node Components

Master Components run globally and affects the entire cluster. Node components run on every node.

### 1.8.1. Container Runtime

Docker, rkt or runc



### 1.8.2. `kube-proxy`

When the scheduler deploy a service on a cluster, it does so on the most appropriate host at the time. This host may change over time. Therefore, it is important to have a service which forwards requests to the correct containers.

In Kubernetes, this is done by `kube-proxy`.


Scheduler - `kube-scheduler` component.



## 1.9. Kubernetes

Kubernetes was an internal tool used by Google, who open-sourced it in 2014.

### 1.9.1. Kubernetes Objects

Containers are ran inside a pod. Pods run on nodes. Newly created pods is assigned to a node by the `kube-scheduler`.

Labels - organize resources
Annotations - Decorate resources with custom information


#### 1.9.1.1. Pod

Pods - a group of containerized services that:

* work closely together
* need to be deployed on the same host
* is able to share resources and configuration

#### 1.9.1.2. Replica

Created from pod templates


## 1.10. Service Discovery

### 1.10.1. Security

Encryption
Access Control












Deploy containrized applications on a cluster

Kubernetes is a cluster orchestration system.

In this chapter, we will learn how to deploy our containerized applications on to a cluster, update our application without down-time, and scale our deployment.

Compose
Kubernetes
Apache Mesos - uses Apache Zookeeper


From the previous chapter, you now understand how to use Docker to provide a consistent environment in which to run our application.

In this chapter, we will look at how we can integrate Docker with Kubernetes to allow us to manage different Docker containers.

Deploy new instances, update existing instances




## 1.11. Benefits of Docker

### 1.11.1. Reduced Server Cost

A container is a process on the host's operating system. It uses the host machine's system call.

Thus, it is fast to boot up and has minimum overhead.

This means 

### 1.11.2. Images are Layered

Because Docker images are built layer by layer, you can have your operations team build a base image that specifies the operating system, set the base configuration, and pre-install any essential libraries. This base image can then be given to different development teams who will build their application as additional layers atop this image.

This prevents incompatibilities between the application and the server at the time of deployment.

### 1.11.3. Supports Service-Orientated Architecture (SOA)


Software developers like to put things into boxes - be it functions, classes, or modules/packages - this is known as modularization.

A good architecture also ensures that each box only performs actions in a single domain - e.g. an module that is used sends SMS messages should not also be responsible for processing payment - this is known as Separation of Concerns.

By modularizing our code into standalone units with a single concern, our code become much more reusable and easier to manage. If we want to replace an old feature, all we need to do is remove the old module and replace it with a new one, without it affecting the entire codebase.

Likewise, when deploying applications, we should keep each application isolated inside its own container, and ensure each application provides a single service, following the Service-Orientated Architecture (SOA) principle.

SOA ensures each component is as light-weight as possible by removing redundant programs, and ensures independence and provides portability for the containers:

If we need to spawn a new instance of the web application because of increased traffic, we can do so without also spawning a new instance of the database or web server
Since each component is independent, we can apply version control to them individually

	Application Structure	Deployment Architecture
Modularization	Packages / Modules	Containers
Separation of Concerns	Single Responsibility Principle	Service-Orientated Architecture (SOA)

For example, a simple social media platform application may be split into four parts:

The core application, written in Python, or Node, or any other language
A MongoDB database that our core application talks to
A search service that uses ElasticSearch to return search results
An NGINX web server to handle requests/responses
You'd have four containers, one for each branch of the application.






## 1.12. Orchestration


In the DevOps model, developers will be responsible for the Docker image. The Operations team will be responsible for securing and managing the containers using an orchestration tool like Kubernetes.








Kubernetes has made managing containers much easier.

Prior to containers and container management tools, most applications are deployed on a handful of servers, as the man-hours required and the risk of errors in maintaining dozens of servers is simply too high.

This allows a monolithic application to be broken down into many smaller services.

Each service can then be maintained by a different team.

Because each service runs inside its own container, and has all dependencies bundled, each service is entirely independent of the other, and can keep its own versions of dependencies.









#### 1.12.0.1. Elasticsearch

https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html




Downtime - Load balancer



Kubernetes Docker Swarm












---









## 1.13. Deployment Strategies

### 1.13.1. Regional Deployments

Deploy on one datacenter during non-peak hours, test that it works there, and then deploy it to the rest of the cluster.

If, using monitoring tools, a lot of 5xx errors are encountered, traffic can be redirected away from the affected region.


### 1.13.2. Blue/Green deployment

The latest deployed version (Blue) of the application will receive traffic as soon as it passes all the tests. When we are satisfied that that version is healthy, the older version of application (Green) will no longer accept any more traffic.

### 1.13.3. No Deploy Fridays

When you deploy anything, make sure you have enough time to remedy any incidents immediately. This means you should not deploy anything at the end of the day, when no one will be around to fix the issue. Likewise, don't deploy on a Friday (the end of the work week for most of the world), as no one is willing to spend their weekends debugging a production issue.

Therefore, we must ensure that Kubernetes only deploy during an explicitly-set time window.

## 1.14. Cluster configuration


Load Balancer

https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-heartbeat-and-floating-ips-on-ubuntu-16-04
https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-corosync-pacemaker-and-floating-ips-on-ubuntu-14-04
https://www.digitalocean.com/community/tutorials/how-to-set-up-highly-available-web-servers-with-keepalived-and-floating-ips-on-ubuntu-14-04

Active/Active

All nodes in the cluster are active at the same time. This means the workload is distributed across all nodes in the cluster. This allows for maximum performance.

However, if one of the nodes go down, then ??


> Check if this is still relevant - https://geoserver.geo-solutions.it/edu/en/clustering/clustering/introduction.html


## 1.15. How many replica

### 1.15.1. Tradeoffs

the more redundancy, the higher the availability. But improving from "three nines" to "four nines" may involve deploying an additional replica, whereas to improve from "four nines" to "five nines" may be more invovled.

diminishing returns



### 1.15.2. Region Evacuation

Routing traffic away from down / unhealthy regions.


### 1.15.3. Auto-Scaling

ASG (Auto Scaling Group). Whenever an instance detects that its own resource usage are above a certain threshold, it will request the scheduler to spawn a new instance of that service in the cluster. Likewise, if the instance detects that its resource usage is below a threshold, it will ask the scheduler to remove an instance from the cluster.



























----




On the following ports:

* `4194` - cAdvisor (short for **C**ontainer **Advisor**) a daemon used to analyze resource usage and performance metrics of running containers
* `10250` or ?? `10255` - `kubelet`
* `10251` - `kube-scheduler`
* `10252` - `kube-controller`









You can get the API specification by navigating to the path `/openapi/v2` on the 


```
$ kubectl cluster-info
Kubernetes master is running at https://10.122.35.199:8443
```

For instance, if your Kubernetes master is running at `https://10.122.35.199:8443`, then, we can view the OpenAPI specification by navigating to `https://10.122.35.199:8443/openapi/v2` will 



##### 1.15.3.0.1. `kubeadm`

??

##### 1.15.3.0.2. `kubelet`

`kubelet` is a client that must run on each node of the cluster and serve to communicate with the Kubernetes API. `kubelet` acts as the contact point between that node and the cluster.

![](https://d33wubrfki0l68.cloudfront.net/99d9808dcbf2880a996ed50d308a186b5900cec9/40b94/docs/tutorials/kubernetes-basics/public/images/module_01_cluster.svg)

Specifically, the `kubelet` service is responsible for:

* Authenticating the node with the cluster
* ??
